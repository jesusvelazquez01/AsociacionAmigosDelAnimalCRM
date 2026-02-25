"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, Instagram, MessageCircle, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import Script from 'next/script';
import { useAnalytics } from '@/hooks/useAnalytics';

// Declarar el tipo global de Turnstile
declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

const TURNSTILE_SITE_KEY = "0x4AAAAAACVz_4qEMa4fKiYG";

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre es requerido."),
  lastName: z.string().optional(),
  email: z.string().email("El correo electrónico no es válido."),
  phone: z.string().optional(),
  subject: z.string().min(2, "El asunto es requerido").max(255),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export default function ContactoPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { trackContactFormSubmitted, trackContactFormError, trackWhatsappUrgentClicked } = useAnalytics();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Renderizar Turnstile cuando el script cargue
  const renderTurnstile = useCallback(() => {
    if (turnstileContainerRef.current && window.turnstile && !turnstileWidgetId.current) {
      turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
        'expired-callback': () => {
          setTurnstileToken(null);
        },
        'error-callback': () => {
          setTurnstileToken(null);
        },
        theme: 'light',
        size: 'normal',
      });
    }
  }, []);

  // Reset Turnstile después del submit
  const resetTurnstile = useCallback(() => {
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken(null);
    }
  }, []);

  // Efecto para renderizar cuando el script esté listo
  useEffect(() => {
    if (turnstileLoaded) {
      renderTurnstile();
    }
  }, [turnstileLoaded, renderTurnstile]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
    };
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "Consulta sobre adopción",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Validar que Turnstile esté completo
    if (!turnstileToken) {
      setSubmitStatus({
        success: false,
        message: "Por favor, completa la verificación de seguridad.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.post('/mensajes', {
        ...values,
        'cf-turnstile-response': turnstileToken,
      });

      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: response.data.message || "¡Mensaje enviado con éxito! Gracias por contactarnos.",
        });
        trackContactFormSubmitted({ subject: values.subject });
        reset();
        resetTurnstile();
      } else {
        setSubmitStatus({
          success: false,
          message: response.data.message || "Error al enviar el mensaje.",
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
      trackContactFormError({ error_message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background overflow-hidden">

      {/* Barra de progreso de lectura superior */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" style={{ scaleX }} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onLoad={() => setTurnstileLoaded(true)}
      />
      {/* --- HERO ESTILO FURS CON IMAGEN --- */}
      {/* --- HERO: VISUAL IMPACT --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img src="/Foto-refugio/refugio-4.jpg" className="w-full h-full object-cover" alt="Fondo" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-primary text-primary text-sm mb-6 uppercase tracking-[0.2em] bg-pink-500/10 backdrop-blur-md">
              Estamos para ayudarte
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              HABLEMOS<br />
              <span className="text-transparent bg-clip-text bg-primary/80 animate-gradient-xy">
                AHORA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
              ¿Tienes preguntas sobre adopción, voluntariado o donaciones? Tu mensaje puede cambiar una vida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN DE CONTACTO --- */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Info de contacto */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">Información de Contacto</h2>

              <div className="space-y-6">
                {/* Ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Ubicación</h3>
                    <p className="text-muted-foreground">San Salvador de Jujuy, Argentina</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Email</h3>
                    <a href="mailto:asociacionamigosdelanimal-jujuy@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      asociacionamigosdelanimal-jujuy@hotmail.com
                    </a>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Teléfono / WhatsApp</h3>
                    <a href="https://wa.me/5493884219759" className="text-muted-foreground hover:text-primary transition-colors">
                      +54 9 388 421-9759
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-foreground mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/AsocAmigosDelAnimal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors group"
                  >
                    <Facebook className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.instagram.com/asoc_amigosdelanimal__jujuy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors group"
                  >
                    <Instagram className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              {/* Card CTA */}
              <motion.div
                className="mt-10 bg-gradient-to-br from-primary to-primary/80 p-6 rounded-3xl text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Heart className="w-10 h-10 mb-3 opacity-90" />
                <h4 className="font-bold text-lg mb-2">¿Urgencia con un animal?</h4>
                <p className="text-white/80 text-sm mb-4">
                  Si encontraste un animal en peligro, contáctanos de inmediato por WhatsApp.
                </p>
                <a
                  href="https://wa.me/5493884219759?text=Hola,%20encontré%20un%20animal%20que%20necesita%20ayuda%20urgente"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsappUrgentClicked}
                  className="inline-block w-full bg-white text-primary font-semibold py-3 px-4 rounded-full hover:bg-white/90 transition-colors text-center"
                >
                  WhatsApp Urgente
                </a>
              </motion.div>
            </motion.div>

            {/* Formulario */}
            <motion.div
              className="bg-card border border-border/50 p-8 rounded-3xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nombre *</label>
                    <input
                      type="text"
                      {...register("firstName")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-foreground"
                      placeholder="Tu nombre"
                    />
                    {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Apellido</label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-foreground"
                      placeholder="Tu apellido"
                    />
                    {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-foreground"
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-foreground"
                      placeholder="+54 9 388 123-4567"
                    />
                    <p className="text-muted-foreground text-xs mt-1">Opcional - Para contactarte más rápido</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Asunto *</label>
                  <select
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-foreground"
                  >
                    <option>Consulta sobre adopción</option>
                    <option>Quiero ser voluntario</option>
                    <option>Información sobre donaciones</option>
                    <option>Reportar animal en peligro</option>
                    <option>Otro</option>
                  </select>
                  {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mensaje *</label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none text-foreground"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-xl ${submitStatus.success ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                    {submitStatus.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full font-semibold text-lg"
                  size="lg"
                >
                  {isSubmitting ? "Enviando..." : (
                    <>
                      Enviar Mensaje
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                {/* Widget de Cloudflare Turnstile */}
                <div
                  ref={turnstileContainerRef}
                  className="flex justify-center"
                />
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="h-96 bg-secondary/20 relative border-t border-border/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116449.33585378545!2d-65.3879568664789!3d-24.20531749128765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f4e8bd7a62f%3A0x315150e057f6e499!2sSan%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses!2sar!4v1765853941308!5m2!1ses!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </section>
    </div>
  );
}

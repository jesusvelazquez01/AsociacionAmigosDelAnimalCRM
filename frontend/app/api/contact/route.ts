import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  // Validar que las variables de entorno estén configuradas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Las variables de entorno EMAIL_USER y EMAIL_PASS no están configuradas.");
    return NextResponse.json({ message: "Error de configuración del servidor." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Usar contraseña de aplicación de Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Enviar al mismo correo configurado
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <h1>Nuevo Mensaje del Formulario de Contacto</h1>
        <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ message: "Email enviado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return NextResponse.json({ message: "Error al enviar el correo" }, { status: 500 });
  }
}

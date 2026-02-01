import Link from 'next/link';

export default function TerminosYCondiciones() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-gray-700">
            <h1 className="text-3xl font-bold mb-6 text-primary">Términos y Condiciones de Uso</h1>

            <p className="mb-6 text-sm text-gray-500">
                Última actualización: Febrero 2026
            </p>

            <div className="space-y-8">

                {/* SECCIÓN 1: INTRODUCCIÓN */}
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Aceptación de los Términos</h2>
                    <p>
                        Bienvenido al sitio web de la <strong>Asociación Amigos del Animal</strong>. Al acceder y utilizar este sitio,
                        usted acepta cumplir con los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de estos términos,
                        le rogamos no utilizar nuestros servicios.
                    </p>
                </section>

                {/* SECCIÓN 2: ADOPCIONES (LO MÁS IMPORTANTE) */}
                <section className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Políticas de Adopción</h2>
                    <div className="space-y-3 text-justify">
                        <p>
                            <strong>2.1. Naturaleza del Formulario:</strong> El completado y envío del "Formulario de Adopción" disponible en este sitio web
                            constituye una <strong>solicitud de interés</strong> y una declaración jurada de los datos proporcionados.
                        </p>
                        <p className="font-medium text-gray-900">
                            <strong>2.2. No Garantía de Adopción:</strong> El envío del formulario <u>NO garantiza</u> la adjudicación del animal ni obliga
                            a la Asociación a concretar la entrega. La adopción está sujeta a un proceso de evaluación exhaustivo que puede incluir entrevistas,
                            visitas al domicilio y verificación de antecedentes.
                        </p>
                        <p>
                            <strong>2.3. Derecho de Admisión:</strong> La Asociación se reserva el derecho exclusivo de aprobar o rechazar cualquier solicitud
                            basándose en el bienestar del animal y su compatibilidad con el perfil del adoptante, sin obligación de justificar detalladamente la negativa.
                        </p>
                        <p>
                            <strong>2.4. Estado de Salud:</strong> La Asociación se compromete a entregar a los animales únicamente tras haber recibido el alta veterinaria correspondiente, habiéndoles brindado todos los tratamientos necesarios para su recuperación física y emocional (incluyendo la superación de cuadros virales o traumáticos previos). Se entregan desparasitados, vacunados y/o castrados según su edad y condición.

                            No obstante, el adoptante comprende que, tratándose de seres vivos con antecedentes de vulnerabilidad, pueden existir condiciones latentes o genéticas imprevisibles. Por ello, una vez firmada la adopción y entregada la libreta sanitaria conforme, la responsabilidad sobre la salud futura del animal recae exclusivamente en el adoptante..
                        </p>
                    </div>
                </section>

                {/* SECCIÓN 3: DONACIONES */}
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Donaciones y Pagos</h2>
                    <p className="mb-2">
                        Las donaciones realizadas a través del sitio son voluntarias, finales e irrevocables.
                    </p>
                    <p>
                        Este sitio utiliza plataformas de terceros (como Mercado Pago) para procesar transacciones.
                        Amigos del Animal no almacena datos bancarios ni de tarjetas de crédito. Cualquier reclamo sobre fallos en el procesamiento del pago
                        deberá dirigirse a la plataforma de pago correspondiente.
                    </p>
                </section>

                {/* SECCIÓN 4: CONDUCTA */}
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Uso Adecuado del Sitio</h2>
                    <p>
                        El usuario se compromete a proporcionar información veraz y actualizada. El uso de datos falsos en formularios de adopción
                        o voluntariado podrá resultar en la suspensión permanente de la posibilidad de interactuar con la Asociación.
                    </p>
                </section>

                {/* SECCIÓN 5: PROPIEDAD INTELECTUAL */}
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Propiedad Intelectual</h2>
                    <p>
                        Las fotografías, logotipos y textos mostrados en este sitio son propiedad de la Asociación Amigos del Animal o de sus autores originales.
                        Queda prohibida su reproducción con fines comerciales o fraudulentos (ej. falsas colectas).
                    </p>
                </section>

                {/* SECCIÓN 6: LEY APLICABLE */}
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Ley Aplicable y Jurisdicción</h2>
                    <p>
                        Estos términos se rigen por las leyes de la República Argentina. Cualquier controversia será sometida a los
                        Tribunales Ordinarios de la ciudad de <strong>San Salvador de Jujuy</strong>, renunciando a cualquier otro fuero que pudiera corresponder.
                    </p>
                </section>

            </div>

            <div className="mt-8">
                <Link href="/contacto" className="text-primary hover:underline font-medium">
                    ¿Dudas sobre estos términos? Contáctanos.
                </Link>
            </div>
        </div>
    );
}
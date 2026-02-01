import Link from 'next/link';

export default function PoliticasDePrivacidad() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-gray-700">
            <h1 className="text-3xl font-bold mb-6 text-primary">Política de Privacidad</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Responsable de los datos</h2>
                <p className="mb-4">
                    La entidad responsable por el tratamiento de los datos personales es <strong>Asociación Amigos del Animal</strong>, con domicilio en San Salvador de Jujuy, Argentina.
                    Al utilizar este sitio, prestas tu consentimiento para el tratamiento de tus datos según esta política.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. ¿Qué datos recolectamos?</h2>
                <p className="mb-4">
                    Solo solicitamos datos necesarios para adopciones, voluntariado y donaciones:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>Datos de contacto: Nombre, teléfono, email, dirección.</li>
                    <li>Para adopciones: Información sobre vivienda y grupo familiar (para evaluación de aptitud).</li>
                    <li>Para donaciones: Los datos de pago seran  procesados externamente por plataformas seguras (ej. Mercado Pago), no almacenamos tarjetas de crédito.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Derechos del titular (Ley 25.326)</h2>
                <p className="mb-4">
                    Como titular de los datos, tienes derecho a acceder, actualizar y suprimir tu información.
                    Amigos del Animal cumple con la Ley de Protección de Datos Personales N° 25.326.
                </p>
                <p className="mb-4">
                    Para ejercer estos derechos, envía un correo a <a href="mailto:contacto@amigosdelanimal.org.ar" className="text-blue-600 hover:underline">contacto@amigosdelanimal.org.ar</a>.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    La Agencia de Acceso a la Información Pública tiene la atribución de atender denuncias y reclamos con relación al incumplimiento de las normas sobre protección de datos personales.
                </p>
            </section>

            {/* Agrega aquí más secciones copiadas y adaptadas de Cáritas si lo ves necesario */}

            <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Última actualización: Febrero 2026</p>
            </div>
        </div>
    );
}
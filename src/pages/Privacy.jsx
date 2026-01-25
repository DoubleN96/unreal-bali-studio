import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-almond min-h-screen pt-16 pb-24 px-6 md:px-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-20 shadow-xl text-left border border-primary/5">
                <h1 className="text-5xl text-primary mb-12">Política de Privacidad</h1>
                <div className="space-y-10 text-primary/70 leading-relaxed font-light text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest text-sm">1. Introducción</h2>
                        <p>En Unreal Studio Madrid (en adelante, "el Studio"), respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web y le informará sobre sus derechos de privacidad y cómo la ley le protege.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest text-sm">2. Datos que recopilamos</h2>
                        <p>Podemos recopilar, utilizar, almacenar y transferir diferentes tipos de datos personales sobre usted, incluyendo:</p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li><strong>Datos de Identidad:</strong> nombre y apellidos.</li>
                            <li><strong>Datos de Contacto:</strong> dirección de correo electrónico y número de teléfono.</li>
                            <li><strong>Datos de Perfil de Inversión:</strong> preferencias de zona, presupuesto estimado y tipo de activo de interés.</li>
                            <li><strong>Datos Técnicos:</strong> dirección IP, tipo de navegador y ubicación.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest text-sm">3. Finalidad del tratamiento</h2>
                        <p>Utilizamos sus datos principalmente para:</p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>Gestionar sus consultas y agendar llamadas de asesoramiento.</li>
                            <li>Enviarle información actualizada sobre nuevas oportunidades de inversión (solo con su consentimiento).</li>
                            <li>Mejorar la experiencia de navegación en nuestro portal mediante análisis estadísticos.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest text-sm">4. Transferencias Internacionales</h2>
                        <p>Debido a que Unreal Studio opera tanto en Madrid como en Bali (Indonesia), sus datos pueden ser accesibles por nuestro equipo operativo en ambas regiones bajo estrictos protocolos de seguridad y cumplimiento del RGPD.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-widest text-sm">5. Sus Derechos</h2>
                        <p>Usted tiene derecho a solicitar el acceso, rectificación o eliminación de sus datos personales. Para ejercer estos derechos, puede contactarnos en <strong>hola@unrealstudio.com</strong> mencionando "Derechos ARCO" en el asunto.</p>
                    </section>
                    <section className="pt-10 border-t border-primary/10 text-sm italic">
                        <p>Última actualización: Mayo 2024. Unreal Studio S.L. - Madrid, España.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;

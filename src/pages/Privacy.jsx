import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-almond min-h-screen pt-32 pb-24 px-6 md:px-12 transition-colors duration-300 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-20 shadow-3xl text-left border border-primary/5">
                <span className="text-primary/40 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block italic">LEGAL FRAMEWORK</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary mb-12 font-serif italic tracking-tighter">Política de Privacidad</h1>
                
                <div className="space-y-12 text-primary/80 leading-relaxed font-medium text-lg">
                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">1. Identidad del Responsable</h2>
                        <p>Stratoma AI (en adelante, "Stratoma"), con correo de contacto <strong>stratoma.ai@gmail.com</strong>, es el responsable del tratamiento de sus datos personales. Esta política explica cómo recopilamos y protegemos su información al interactuar con nuestras soluciones de Inteligencia Artificial.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">2. Datos Recopilados vía Google OAuth</h2>
                        <p>Nuestra aplicación utiliza los servicios de Google OAuth para facilitar el acceso y personalización. Al utilizar este servicio, recopilamos:</p>
                        <ul className="list-disc ml-6 mt-4 space-y-3">
                            <li><strong>Perfil Básico:</strong> Nombre y correo electrónico asociado a su cuenta de Google.</li>
                            <li><strong>Uso de Datos:</strong> Solo utilizamos esta información para identificarle dentro del Generador de WEBs Stratomai y para comunicaciones de servicio.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">3. Finalidad del Tratamiento</h2>
                        <p>Los datos se tratan con el fin de:</p>
                        <ul className="list-disc ml-6 mt-4 space-y-3">
                            <li>Proporcionar acceso seguro a las herramientas de generación de webs.</li>
                            <li>Personalizar la experiencia del usuario basada en sus preferencias de IA.</li>
                            <li>Cumplir con los requisitos de seguridad de la Google Auth Platform.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">4. Seguridad de los Datos</h2>
                        <p>Stratoma implementa medidas técnicas y organizativas de última generación para garantizar que sus datos personales no sean alterados, perdidos o accedidos de forma no autorizada.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">5. Derechos del Usuario</h2>
                        <p>Usted puede retirar su consentimiento de OAuth en cualquier momento desde la configuración de su cuenta de Google o contactando con nosotros en <strong>stratoma.ai@gmail.com</strong> para solicitar la supresión definitiva de sus datos de nuestro sistema.</p>
                    </section>

                    <section className="pt-10 border-t border-primary/10 text-xs uppercase font-black tracking-widest text-primary/40">
                        <p>Última actualización: Enero 2026. Stratoma AI Group.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
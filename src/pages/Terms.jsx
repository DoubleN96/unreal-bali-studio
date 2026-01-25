import React from 'react';

const Terms = () => {
    return (
        <div className="bg-almond min-h-screen pt-32 pb-24 px-6 md:px-12 transition-colors duration-300 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-20 shadow-3xl text-left border border-primary/5">
                <span className="text-primary/40 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block italic">USER AGREEMENT</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary mb-12 font-serif italic tracking-tighter">Términos de Servicio</h1>
                
                <div className="space-y-12 text-primary/80 leading-relaxed font-medium text-lg">
                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">1. Aceptación del Servicio</h2>
                        <p>Al acceder al "Generador de WEBs Stratomai", usted acepta estar sujeto a estos términos. Stratoma proporciona herramientas basadas en Inteligencia Artificial para la creación y gestión de contenidos digitales.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">2. Uso de la IA y Generación de Contenido</h2>
                        <p>El usuario reconoce que los resultados generados por la IA pueden requerir revisión humana. Stratoma no se hace responsable de las interpretaciones erróneas de los datos generados por los modelos de lenguaje integrados.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">3. Google OAuth y Cuentas de Usuario</h2>
                        <p>El acceso a determinadas funcionalidades requiere la vinculación de su cuenta de Google. Usted es responsable de mantener la seguridad de sus credenciales y de autorizar los permisos necesarios para el correcto funcionamiento de la herramienta.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">4. Propiedad de los Resultados</h2>
                        <p>El código y los diseños generados a través de Stratoma son propiedad del usuario que los origina, otorgando a Stratoma una licencia limitada para procesar y optimizar dichos activos dentro de la infraestructura del servicio.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-primary mb-6 font-serif italic">5. Limitación de Responsabilidad</h2>
                        <p>Stratoma AI no garantiza que el servicio sea ininterrumpido. Nos reservamos el derecho de actualizar, modificar o suspender módulos del sistema para cumplir con las políticas de Google y otros proveedores de IA.</p>
                    </section>

                    <section className="pt-10 border-t border-primary/10 text-xs uppercase font-black tracking-widest text-primary/40">
                        <p>© 2026 Stratoma Consulting Group - Excellence in AI.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
import React from 'react';
import { useCurrency } from '../App';

const Invest = () => {
    const { formatPrice } = useCurrency();

    return (
        <div className="bg-almond text-dark font-sans">
            {/* Hero Section */}
            <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop" 
                        alt="Luxury Bali Villa" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-white space-y-8 animate-in fade-in duration-1000">
                        <div className="inline-block bg-primary/90 text-almond px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                            #1 Proptech en Bali
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                            Invierte en las villas más <span className="text-celeste italic">rentables</span> de Bali.
                        </h1>
                        <p className="text-xl md:text-2xl font-light opacity-90 max-w-xl">
                            Desde <span className="font-bold text-celeste">159.000€</span>. Diversifica en el destino Nº1 mundial. Nos encargamos de todo: trámites, construcción y gestión del alquiler.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="#contacto" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(61,40,23,0.5)] text-center">
                                Sesión de Inversión Gratuita
                            </a>
                            <div className="flex items-center gap-2 justify-center sm:justify-start text-sm opacity-80">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Sin ningún compromiso
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/20">
                            <div>
                                <p className="text-3xl font-serif font-bold text-celeste">+15%</p>
                                <p className="text-sm opacity-70">Rentabilidad Neta Estimada</p>
                            </div>
                            <div>
                                <p className="text-3xl font-serif font-bold text-celeste">100%</p>
                                <p className="text-sm opacity-70">Gestión Pasiva</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario Hero (Optional or Image) */}
                    <div className="hidden md:block bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                        <h3 className="text-2xl font-serif font-bold text-white mb-6">Solicita tu Dossier</h3>
                        <form className="space-y-4">
                            <input type="text" placeholder="Nombre" className="w-full bg-white/80 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-celeste text-dark" />
                            <input type="email" placeholder="Email" className="w-full bg-white/80 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-celeste text-dark" />
                            <input type="tel" placeholder="Teléfono (WhatsApp)" className="w-full bg-white/80 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-celeste text-dark" />
                            <button className="w-full bg-celeste hover:bg-celeste/90 text-dark font-bold py-4 rounded-lg transition-all">
                                Recibir Información
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Social Proof */}
            <section className="py-12 border-b border-primary/10">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Visto en</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Forbes', 'El Mundo', 'Expansión', 'Idealista'].map(brand => (
                            <span key={brand} className="text-2xl font-serif font-bold text-primary">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: 'Inversores', value: '+500' },
                            { label: 'Gestión de Activos', value: '€50M+' },
                            { label: 'Proyectos Entregados', value: '12' },
                            { label: 'Ocupación Media', value: '88%' }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary">{stat.value}</h3>
                                <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Showcase */}
            <section className="py-24 bg-almond">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Nuestros Proyectos</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Villas diseñadas para el máximo retorno de inversión en las zonas más exclusivas de Bali.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Project 1 */}
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">EN FUNCIONAMIENTO</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Canggu Sanctuary</h3>
                                <p className="text-gray-500 text-sm mb-4">Entrega: 2024</p>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                    <span className="text-primary font-bold text-lg">159.000€</span>
                                    <button className="text-celeste font-bold hover:text-primary transition-colors">Ver Detalles →</button>
                                </div>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">EN CONSTRUCCIÓN</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Uluwatu Heights</h3>
                                <p className="text-gray-500 text-sm mb-4">Entrega: Q3 2025</p>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                    <span className="text-primary font-bold text-lg">189.000€</span>
                                    <button className="text-celeste font-bold hover:text-primary transition-colors">Ver Detalles →</button>
                                </div>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-celeste text-white text-xs font-bold px-3 py-1 rounded-full">DISPONIBLE</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Nusa Dua Cliff</h3>
                                <p className="text-gray-500 text-sm mb-4">Lanzamiento: Q4 2025</p>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                    <span className="text-primary font-bold text-lg">210.000€</span>
                                    <button className="text-celeste font-bold hover:text-primary transition-colors">Ver Detalles →</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services / How it Works */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Inversión 100% Pasiva.</h2>
                            <p className="text-lg text-gray-600">Nosotros hacemos el trabajo sucio. Tú recibes los ingresos.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { title: 'Búsqueda y Adquisición', desc: 'Identificamos terrenos prime con alto potencial de revalorización.' },
                                    { title: 'Diseño y Construcción', desc: 'Arquitectura sostenible y construcción de alta calidad supervisada.' },
                                    { title: 'Gestión Integral', desc: 'Marketing en Airbnb/Booking, check-in, limpieza y mantenimiento.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-12 h-12 bg-almond rounded-full flex items-center justify-center text-primary font-serif font-bold text-xl flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-primary mb-1">{item.title}</h4>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop" className="rounded-2xl shadow-2xl" />
                            <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-xl max-w-xs shadow-xl hidden md:block">
                                <p className="font-serif italic text-xl">"La mejor decisión financiera que he tomado. Mi villa se paga sola."</p>
                                <p className="mt-4 text-sm font-bold text-celeste">— Carlos M., Inversor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Bali */}
            <section className="py-24 bg-primary text-almond">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16">¿Por qué Bali?</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <div className="text-5xl mb-4">🏆</div>
                            <h3 className="text-2xl font-bold mb-4">Destino #1</h3>
                            <p className="opacity-80">Elegido mejor destino turístico mundial por TripAdvisor repetidamente.</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <div className="text-5xl mb-4">📈</div>
                            <h3 className="text-2xl font-bold mb-4">Alta Ocupación</h3>
                            <p className="opacity-80">Media anual superior al 80%, asegurando flujo de caja constante.</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-2xl font-bold mb-4">Alto ROI</h3>
                            <p className="opacity-80">Rentabilidades netas del 12-18%, muy superiores a Europa.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-center text-4xl font-serif font-bold text-primary mb-12">La Diferencia Unreal</h2>
                    <div className="grid md:grid-cols-2 border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-8 bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-500 mb-6">Por tu cuenta</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex gap-3">❌ Burocracia indonesia compleja</li>
                                <li className="flex gap-3">❌ Riesgo de estafas en terrenos</li>
                                <li className="flex gap-3">❌ Supervisión de obra remota imposible</li>
                                <li className="flex gap-3">❌ Gestión de huéspedes 24/7 agotadora</li>
                            </ul>
                        </div>
                        <div className="p-8 bg-almond/30 relative">
                            <div className="absolute top-0 right-0 bg-celeste text-white px-4 py-1 text-xs font-bold rounded-bl-xl">RECOMENDADO</div>
                            <h3 className="text-xl font-bold text-primary mb-6">Con Unreal Bali</h3>
                            <ul className="space-y-4 text-primary font-medium">
                                <li className="flex gap-3">✅ Estructura legal segura (PT PMA)</li>
                                <li className="flex gap-3">✅ Due Diligence completa del terreno</li>
                                <li className="flex gap-3">✅ Reportes de obra semanales (WhatsApp)</li>
                                <li className="flex gap-3">✅ Gestión hotelera profesional completa</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section id="contacto" className="py-24 bg-dark text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">¿Listo para diversificar?</h2>
                    <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto">Agenda una llamada de 15 minutos con nuestros expertos. Analizaremos tu perfil y te mostraremos las oportunidades disponibles.</p>
                    
                    <a href="https://wa.me/34600000000" className="inline-block bg-celeste hover:bg-celeste/90 text-dark px-10 py-5 rounded-full font-bold text-xl transition-transform hover:scale-105 shadow-2xl">
                        Agendar Llamada Ahora
                    </a>
                    <p className="mt-6 text-sm text-gray-400">Plazas limitadas para el Q3 2026</p>
                </div>
            </section>
        </div>
    );
};

export default Invest;

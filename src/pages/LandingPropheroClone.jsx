import React, { useState } from 'react';
import { useCurrency } from '../App';
import { CheckCircle, Play, ArrowRight, Star, TrendingUp, Shield, MapPin, Calendar, Users, ChevronRight, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente de Formulario (Estilizado para parecer un bloque de sesión)
const SessionForm = ({ className }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.href = "https://wa.me/34610095844?text=Hola,%20quiero%20reservar%20mi%20sesión%20gratuita%20sobre%20Casa%20Palmers%20Melasti";
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reserva tu sesión gratuita</h3>
            <div>
                <input required type="text" placeholder="Nombre completo" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            <div>
                <input required type="email" placeholder="Correo electrónico" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            <div>
                <input required type="tel" placeholder="Teléfono (WhatsApp)" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition" />
            </div>
            
            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 px-6 text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all bg-[#2050f6] flex justify-center items-center gap-2"
            >
                {loading ? 'Procesando...' : 'QUIERO MI SESIÓN GRATUITA'}
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">Plazas limitadas para esta semana.</p>
        </form>
    );
};

const LandingPropheroClone = () => {
    const { formatPrice } = useCurrency();
    
    // Colores EXACTOS extraídos con Playwright
    const colors = {
        primary: "#2050f6", // Azul Eléctrico Prophero (Botones/Acentos)
        bgHero: "#f3f5fe",  // Azul Pálido (Fondo Hero)
        textMain: "#000000", // Negro Puro
        textSec: "#4b5563"   // Gris oscuro
    };

    return (
        <div className="font-sans text-black bg-white">
            {/* Top Bar - Urgency Real */}
            <div className="bg-[#2050f6] text-white text-center py-3 px-4 text-sm font-medium">
                <p>🔥 <strong>Oportunidad Casa Palmers:</strong> Últimas 2 unidades en Melasti a precio inversor ($159k)</p>
            </div>

            {/* Navbar Minimalista */}
            <header className="container mx-auto px-6 py-6 flex justify-between items-center bg-white sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    {/* Logo Simulado Prophero Style */}
                    <div className="w-8 h-8 bg-[#2050f6] rounded-lg flex items-center justify-center text-white font-bold text-xl">U</div>
                    <span className="font-bold text-xl tracking-tight">Unreal<span className="text-[#2050f6]">Studio</span></span>
                </div>
                <a href="#book" className="hidden md:block bg-[#2050f6] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Sesión Gratuita
                </a>
            </header>

            {/* HERO SECTION - REPLICA EXACTA DE ESTRUCTURA */}
            <section className="pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden" style={{ backgroundColor: colors.bgHero }}>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        
                        {/* Izquierda: Copy */}
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#2050f6] text-sm font-bold shadow-sm border border-blue-100">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                +100 Operaciones/mes (Ref. Prophero)
                            </div>
                            
                            <h1 className="text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-black">
                                Invierte en las villas más rentables de Bali por <span className="text-[#2050f6]">$159,000</span>
                            </h1>
                            
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Olvídate de rendimientos bajos. Casa Palmers te ofrece <strong>19.74% ROI Neto</strong> en Melasti, Uluwatu. Gestión 100% pasiva.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a href="#book" className="px-8 py-4 bg-[#2050f6] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    Sesión gratuita de inversión <ArrowRight size={20} />
                                </a>
                                <div className="flex items-center gap-[-10px] px-4">
                                    <div className="flex -space-x-3">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                                                <img src={`https://randomuser.me/api/portraits/men/${30+i}.jpg`} alt="User" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ml-4 text-sm font-medium">
                                        <div className="flex text-yellow-400">★★★★★</div>
                                        <span className="text-gray-500">+450 Inversores</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Derecha: Imagen/Video (Estilo Prophero Landing Bakery) */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop" 
                                    alt="Villa Melasti Hyperrealistic" 
                                    className="w-full h-auto object-cover"
                                />
                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Rentabilidad Actual</p>
                                        <p className="text-lg font-bold text-gray-900">19.74% Neto</p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Blob */}
                            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/30 blur-3xl rounded-full"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECCIÓN "POR QUÉ BALI" - Estilo Grid Limpio */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Deja la inversión en Bali en nuestras manos</h2>
                        <p className="text-xl text-gray-500">Nos encargamos de absolutamente todo. Desde la construcción hasta el último huésped.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Encuentra",
                                desc: "Seleccionamos suelo premium en Melasti (Uluwatu) antes que el mercado.",
                                icon: MapPin
                            },
                            {
                                title: "Construye",
                                desc: "Desarrollamos villas de lujo optimizadas para alquiler vacacional (3 Habitaciones).",
                                icon: HomeIcon
                            },
                            {
                                title: "Gestiona",
                                desc: "Operación hotelera completa. Tú recibes transferencias trimestrales.",
                                icon: CheckCircle
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-[#f3f5fe] rounded-2xl flex items-center justify-center text-[#2050f6] mb-6 group-hover:scale-110 transition duration-300">
                                    <item.icon size={36} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE DATOS - "HARD FACTS" */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#2050f6] text-white px-4 py-1 rounded-bl-xl font-bold text-sm">CASA PALMERS</div>
                            <h3 className="text-2xl font-bold mb-6">Ficha Técnica: Melasti Villas</h3>
                            <ul className="space-y-6">
                                {[
                                    { label: "Precio Inversor", val: "$159,000", highlight: true },
                                    { label: "Precio Público (Exit)", val: "$206,700", highlight: false },
                                    { label: "ROI Estimado", val: "19.74%", highlight: true, color: "text-green-600" },
                                    { label: "Ubicación", val: "Melasti, Uluwatu", highlight: false },
                                    { label: "Entrega", val: "10-12 Meses", highlight: false }
                                ].map((row, j) => (
                                    <li key={j} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                                        <span className="text-gray-500 font-medium">{row.label}</span>
                                        <span className={`font-bold text-lg ${row.color || 'text-gray-900'} ${row.highlight ? 'bg-[#f3f5fe] px-2 py-1 rounded' : ''}`}>{row.val}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h2 className="text-3xl font-bold mb-6">¿Por qué este proyecto?</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="mt-1"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2050f6] font-bold">1</div></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Zona de Máxima Revalorización</h4>
                                        <p className="text-gray-600">Melasti es el nuevo "Millionaire's Row" de Bali. Comprar aquí a $159k es entrar con equity instantáneo.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2050f6] font-bold">2</div></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Producto "No-Brainer"</h4>
                                        <p className="text-gray-600">3 Habitaciones por el precio de 1 en Canggu. Ideal para familias y grupos, el nicho más rentable.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2050f6] font-bold">3</div></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Seguridad Total</h4>
                                        <p className="text-gray-600">Estructura legal PT PMA, notario internacional y Due Diligence completa realizada por Casa Palmers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL - FORMULARIO */}
            <section id="book" className="py-24 bg-[#f3f5fe]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Reserva una sesión gratuita</h2>
                        <p className="text-xl text-gray-600">Analicemos si esta inversión encaja en tu portfolio. Sin compromiso.</p>
                    </div>
                    
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                        <SessionForm />
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-500 text-sm">
                <p>© 2026 Unreal Studio & Casa Palmers. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

// Helper icon wrapper if Home is missing in imports
const HomeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export default LandingPropheroClone;
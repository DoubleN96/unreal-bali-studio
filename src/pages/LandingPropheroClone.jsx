import React, { useState } from 'react';
import { useCurrency } from '../App';
import { CheckCircle, Play, ArrowRight, Star, TrendingUp, Shield, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente de Formulario Reutilizable
const LeadForm = ({ className, buttonColor = "bg-[#00c853]" }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulación de envío
        setTimeout(() => {
            setLoading(false);
            alert("¡Solicitud recibida! Te enviaremos el dossier a tu WhatsApp.");
            // Aquí iría la integración real con Supabase/CRM
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                <input required type="text" placeholder="Tu nombre completo" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp (con prefijo)</label>
                <input required type="tel" placeholder="+34 600 000 000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input required type="email" placeholder="tu@email.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500 mt-2">
                <input type="checkbox" required className="mt-1" />
                <span>Acepto recibir información sobre oportunidades de inversión en Bali.</span>
            </div>
            <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 px-6 text-white font-bold text-lg rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-1 ${buttonColor} flex justify-center items-center gap-2`}
            >
                {loading ? 'Enviando...' : (
                    <>
                        SOLICITAR DOSSIER OFICIAL <ArrowRight size={20} />
                    </>
                )}
            </button>
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                <Shield size={12} className="text-green-600" /> Datos 100% seguros y encriptados.
            </p>
        </form>
    );
};

const LandingPropheroClone = () => {
    const { formatPrice } = useCurrency();
    
    // Colores extraídos de la referencia (Aproximación por análisis)
    const colors = {
        primary: "#172554", // Azul oscuro serio
        accent: "#2350f6",  // Azul eléctrico Prophero
        cta: "#00c853",     // Verde conversión
        bg: "#f9fafb",      // Gris muy claro
        text: "#1f2937"     // Gris oscuro
    };

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-blue-100">
            {/* Top Bar Urgency */}
            <div className="bg-[#172554] text-white text-center py-2 px-4 text-sm font-medium flex justify-center items-center gap-2">
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">CASA PALMERS EXCLUSIVE</span>
                <span>Oportunidad Off-Market: Melasti Villas Fase Privada.</span>
            </div>

            {/* Navbar Simplificado (Sin fugas) */}
            <header className="container mx-auto px-4 py-4 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
                <div className="font-serif text-2xl font-bold tracking-tighter text-[#3D2817]">
                    UNREAL<span className="text-[#2350f6]">STUDIO</span>
                </div>
                <a 
                    href="https://wa.me/34600000000" // Reemplazar con número real
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-6 h-6" />
                    +34 600 000 000
                </a>
            </header>

            {/* HERO SECTION: Estilo Prophero (Split o Centrado agresivo) */}
            <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        
                        {/* Copy de Venta */}
                        <div className="lg:w-1/2 space-y-6 z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                                <Star size={14} fill="currentColor" /> Selección Premium Casa Palmers
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#111827]">
                                Villa de Lujo en Melasti (Uluwatu) por <span className="text-[#2350f6] bg-blue-50 px-2 rounded-lg">$159,000</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                Accede a la zona más exclusiva de Bali con una rentabilidad proyectada del <strong className="text-green-600">19.74% anual</strong>. 3 Habitaciones, piscina privada y gestión integral.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 py-4">
                                {[
                                    { icon: TrendingUp, text: "ROI Neto 19.74%" },
                                    { icon: Shield, text: "Propiedad Leasehold Segura" },
                                    { icon: Users, text: "Gestión Casa Palmers" },
                                    { icon: MapPin, text: "Melasti, Uluwatu (Beachfront)" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-semibold text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4].map(i => (
                                        <img key={i} src={`https://randomuser.me/api/portraits/men/${20+i}.jpg`} alt="Investor" className="w-8 h-8 rounded-full border-2 border-white" />
                                    ))}
                                </div>
                                <p>Unidades limitadas a este precio de inversor.</p>
                            </div>
                        </div>

                        {/* Formulario Flotante (Clave Prophero) */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100 p-6 lg:p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-[#facc15] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    PRECIO INVERSOR
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-[#111827]">Solicita el Dossier "Melasti"</h3>
                                <p className="text-gray-500 text-sm mb-6">Recibe planos detallados, tabla financiera de Casa Palmers y disponibilidad actual.</p>
                                <LeadForm />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f0fdf4] -z-10 skew-x-12 translate-x-32 hidden lg:block opacity-50" />
            </section>

            {/* VIDEO / VISUAL BREAK */}
            <section className="bg-[#111827] text-white py-12 overflow-hidden">
                <div className="container mx-auto px-4 text-center mb-8">
                    <p className="text-blue-400 font-bold tracking-widest uppercase text-xs">Ubicación Premium</p>
                    <h2 className="text-3xl font-bold mt-2">A minutos de Melasti Beach</h2>
                </div>
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group cursor-pointer">
                        <img 
                            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop" 
                            alt="Melasti Beach Uluwatu" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
                                <div className="w-16 h-16 bg-[#2350f6] rounded-full flex items-center justify-center shadow-lg">
                                    <Play fill="white" size={32} className="ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <span className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded text-sm font-medium">📍 Melasti, Uluwatu</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE PROPOSITION MATRIX */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">¿Por qué Casa Palmers en Melasti?</h2>
                        <p className="text-gray-600">Una selección estratégica en la zona de mayor revalorización de Bali, superando los retornos de Canggu.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 text-[#2350f6] rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">ROI Líder: 19.74%</h3>
                            <p className="text-gray-600 text-sm">Nuestras villas de 3 habitaciones en Melasti ofrecen un rendimiento superior gracias a la alta demanda de familias y grupos en Uluwatu.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Precio "Investor"</h3>
                            <p className="text-gray-600 text-sm">Entras a <strong>$159,000</strong>. El precio público de venta proyectado es $206,700. Obtienes plusvalía inmediata.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Gestión Integral</h3>
                            <p className="text-gray-600 text-sm">Casa Palmers se encarga de la comercialización, mantenimiento y huéspedes. Inversión pasiva real.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Comparativa de Mercado</h2>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-sm uppercase tracking-wide text-gray-500">
                                    <th className="p-4 border-b">Concepto</th>
                                    <th className="p-4 border-b font-bold text-[#2350f6]">Melasti Villas (Casa Palmers)</th>
                                    <th className="p-4 border-b text-gray-400">Propiedad Estándar España</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm md:text-base">
                                <tr>
                                    <td className="p-4 font-semibold text-gray-700">Inversión Inicial</td>
                                    <td className="p-4 bg-blue-50/50 font-bold text-[#111827]">$159,000</td>
                                    <td className="p-4 text-gray-500">€250,000+</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-gray-700">Rentabilidad (ROI)</td>
                                    <td className="p-4 bg-blue-50/50 font-bold text-green-600">19.74%</td>
                                    <td className="p-4 text-gray-500">3% - 5%</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-gray-700">Ubicación</td>
                                    <td className="p-4 bg-blue-50/50 font-bold text-[#111827]">Uluwatu (High Demand)</td>
                                    <td className="p-4 text-gray-500">Periferia Urbana</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold text-gray-700">Potencial Reventa</td>
                                    <td className="p-4 bg-blue-50/50 font-bold text-[#111827]">Alto (Zona en auge)</td>
                                    <td className="p-4 text-gray-500">Moderado</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-20 bg-[#172554] text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Asegura tu unidad en Melasti</h2>
                <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">Solo quedan 2 unidades de 3 Habitaciones a precio de inversor ($159k).</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a href="#top" className="bg-[#00c853] hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-6 h-6" />
                        RESERVAR CONSULTA
                    </a>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-[#0f172a] text-gray-400 py-8 text-sm text-center">
                <div className="container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} Unreal Studio & Casa Palmers. Todos los derechos reservados.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link to="/privacidad" className="hover:text-white">Privacidad</Link>
                        <Link to="/terminos" className="hover:text-white">Términos</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPropheroClone;

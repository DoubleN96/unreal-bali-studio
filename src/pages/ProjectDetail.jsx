import { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCurrency } from '../App';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const { formatPrice } = useCurrency();
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data } = await supabase.from('projects').select('*').eq('id', id).single();
                if (data) setProject(data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchProject();
    }, [id]);

    const allImages = useMemo(() => {
        if (!project) return [];
        const list = [project.image];
        if (project.gallery_images) list.push(...project.gallery_images);
        return list.filter(img => img && img.length > 0);
    }, [project]);

    if (loading) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary font-black uppercase text-xs">Cargando Activo...</div>;
    if (!project) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary font-bold">Activo no encontrado.</div>;

    return (
        <div className="bg-almond text-primary selection:bg-primary selection:text-white min-h-screen font-sans">
            {/* Cinematic Gallery */}
            <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
                <img src={allImages[activeImage]} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000" alt={project.name} />
                <div className="absolute inset-0 bg-celeste/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-almond via-transparent to-transparent"></div>
                
                <div className="absolute bottom-12 left-6 md:left-12 right-6 flex flex-col md:flex-row justify-between items-start md:items-end max-w-7xl mx-auto gap-8">
                    <div className="text-left animate-in slide-in-from-left-10 duration-700">
                        <span className="bg-primary text-white text-[10px] uppercase font-black px-4 py-2 rounded-full tracking-widest mb-6 inline-block shadow-2xl">{project.property_type}</span>
                        <h1 className="text-5xl md:text-8xl font-black text-primary mb-4 leading-[0.9] font-serif italic tracking-tighter">{project.name}</h1>
                        <div className="flex items-center text-primary/60 text-sm font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-lg mr-2 text-primary">location_on</span>
                            {project.location}
                        </div>
                    </div>
                    <div className="flex gap-3 pb-4">
                        {allImages.map((_, i) => (
                            <button key={i} onClick={() => setActiveImage(i)} className={`w-2.5 h-2.5 rounded-full transition-all border border-primary/20 ${i === activeImage ? 'bg-primary w-8 border-primary shadow-lg' : 'bg-white/40'}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics Bar */}
            <div className="bg-white text-primary py-10 md:py-16 px-6 md:px-12 shadow-xl relative z-10 border-y border-primary/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:divide-x divide-primary/10">
                    {[
                        { label: 'ROI Proyectado', value: project.roi, sub: 'Estimado' },
                        { label: 'Inversión desde', value: formatPrice(project.base_price, 'USD'), sub: 'USD' },
                        { label: 'Precio Mercado', value: formatPrice(project.market_price || project.base_price * 1.25, 'USD'), sub: 'Equity' },
                        { label: 'Estado', value: project.status, sub: 'Fase de Obra' }
                    ].map((m, i) => (
                        <div key={i} className="md:px-10 text-center md:text-left space-y-2">
                            <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black text-primary/30">{m.label}</p>
                            <p className="text-2xl md:text-4xl font-black font-serif italic">{m.value}</p>
                            <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest">{m.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                <div className="lg:col-span-8 space-y-20 text-left">
                    <section>
                        <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block italic">THE VISION</span>
                        <h2 className="text-4xl md:text-6xl font-black text-primary mb-10 font-serif italic">Exclusive Architecture</h2>
                        <div className="prose prose-lg text-primary/70 font-medium max-w-none leading-relaxed">
                            <p className="whitespace-pre-line">{project.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
                            {[
                                { icon: 'beach_access', label: 'Distancia Playa', value: project.distance_to_beach || '500m' },
                                { icon: 'history', label: 'Contrato Leasehold', value: `${project.contract_years || 25} Años` },
                                { icon: 'inventory_2', label: 'Disponibilidad', value: project.available_units || 'Available' },
                                { icon: 'construction', label: 'Progreso Obra', value: `${project.completion_percentage || 0}%` }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6 bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="bg-almond p-4 rounded-2xl">
                                        <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-[8px] uppercase font-black text-primary/30 tracking-widest mb-1">{item.label}</p>
                                        <p className="font-black text-primary text-xl font-serif italic">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Secondary Gallery */}
                    <section>
                        <h3 className="text-3xl md:text-4xl font-black text-primary mb-12 font-serif italic">Architecture & Design</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {allImages.slice(1).map((img, i) => (
                                <div key={i} className={`rounded-[2rem] overflow-hidden shadow-2xl relative group ${i === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                    <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Interior" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Card */}
                <div className="lg:col-span-4 relative">
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-primary/10 shadow-3xl text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-almond rounded-bl-full opacity-50 -mr-16 -mt-16 transition-all duration-700 group-hover:w-48 group-hover:h-48"></div>
                            <h3 className="text-2xl md:text-3xl font-black text-primary mb-10 pb-6 border-b border-primary/5 font-serif italic">Reserva Activo</h3>
                            <div className="space-y-8 mb-12">
                                <div className="flex justify-between items-center">
                                    <span className="text-primary/40 font-bold text-[9px] uppercase tracking-widest">Yield Estimado</span>
                                    <span className="text-primary font-black text-2xl font-serif italic">{project.roi}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary/40 font-bold text-[9px] uppercase tracking-widest">Contrato</span>
                                    <span className="text-primary font-black text-lg italic">{project.contract_years || 25} Años</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <a href="https://wa.me/6285217790692" target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300">
                                    <span className="material-symbols-outlined text-lg">chat</span> WhatsApp Expert
                                </a>
                                <button className="w-full bg-white text-primary py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-2 border-primary/10 flex items-center justify-center gap-3 hover:bg-almond transition-all duration-300">
                                    Pedir Brochure <span className="material-symbols-outlined text-sm">download</span>
                                </button>
                            </div>
                            <p className="text-[8px] text-primary/30 mt-8 text-center uppercase font-black tracking-widest">Secured by PMA Notary Laws</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;
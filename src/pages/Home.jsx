import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCurrency } from '../App';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { formatPrice, currency } = useCurrency();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: projectsData } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                const { data: blogsData } = await supabase
                    .from('blogs')
                    .select('*')
                    .order('date', { ascending: false })
                    .limit(3);

                if (projectsData) setProjects(projectsData);
                if (blogsData) setBlogs(blogsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const featuredProject = useMemo(() => {
        return projects.find(p => p.is_featured) || projects[0];
    }, [projects]);

    const avgROI = useMemo(() => {
        if (!projects.length) return "14.2%";
        const rois = projects.map(p => parseFloat(p.roi)).filter(r => !isNaN(r));
        if (!rois.length) return "14.2%";
        return (rois.reduce((a, b) => a + b, 0) / rois.length).toFixed(1) + "%";
    }, [projects]);

    if (loading) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary font-bold tracking-widest uppercase text-xs">Cargando Experiencia...</div>;

    return (
        <div className="bg-almond text-dark selection:bg-primary selection:text-white overflow-x-hidden antialiased font-sans">
            {/* Hero Section */}
            <header className="relative w-full h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden px-6">
                <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[15s] hover:scale-110 grayscale-[0.2]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000')" }}></div>
                <div className="absolute inset-0 bg-almond/60 z-10"></div>
                <div className="relative z-20 container mx-auto flex flex-col items-center text-center max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-primary text-white text-[10px] font-bold tracking-[0.3em] uppercase shadow-xl">
                        UNREAL STUDIO MADRID
                    </span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-10 text-primary font-serif italic">
                        Invierte en <br/>
                        <span className="opacity-80">Bali</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-primary/70 max-w-2xl mb-12 font-medium leading-relaxed">
                        Genera hasta un <span className="text-primary font-black">28% anual</span> a coste directo de desarrollador con nuestro estudio propio de arquitectura.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                        <Link to="/contacto" className="h-16 px-10 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-2xl">
                            Agendar Llamada <span className="material-symbols-outlined text-sm">calendar_month</span>
                        </Link>
                        <Link to="/proyectos" className="h-16 px-10 rounded-full bg-white text-primary text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 shadow-xl border border-primary/5">
                            Ver Propiedades
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <span className="material-symbols-outlined text-primary/30 text-4xl font-light">expand_more</span>
                </div>
            </header>

            {/* Market Performance Section (Almond to White transition) */}
            <section className="py-32 md:py-48 bg-white border-y border-primary/5" id="roi">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
                        <div className="text-left max-w-2xl">
                            <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">DATA-DRIVEN INVESTMENT</span>
                            <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif text-primary">Market Performance</h2>
                            <p className="text-primary/60 text-lg md:text-xl font-medium leading-relaxed">Bali continúa desafiando las tendencias globales con ocupaciones superiores al 90% en activos gestionados profesionalmente.</p>
                        </div>
                        <button className="text-primary hover:scale-105 flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 border-primary/20 pb-2">
                            Descargar Reporte 2024 <span className="material-symbols-outlined text-lg">download</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Avg. Annual Yield', value: avgROI, icon: 'trending_up', sub: '+2.4% vs last year' },
                            { label: 'Occupancy Rate', value: '92%', icon: 'calendar_month', sub: 'Year-round average' },
                            { label: 'Capital Growth', value: '22%', icon: 'currency_exchange', sub: 'Land appreciation' },
                            { label: 'Total Managed', value: '$42M+', icon: 'verified', sub: 'Assets under mgmt' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-almond/30 border border-primary/5 p-10 rounded-[2rem] group hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden text-left shadow-sm">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-primary text-5xl">{stat.icon}</span>
                                </div>
                                <p className="text-primary/40 text-[9px] font-bold uppercase tracking-widest mb-4 font-sans">{stat.label}</p>
                                <div className="text-5xl font-black text-primary mb-3 font-serif italic">{stat.value}</div>
                                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Asset (Focus on high-end editorial) */}
            {featuredProject && (
                <section className="py-32 md:py-48 bg-almond">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-7 group relative">
                                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-3xl relative">
                                    <img src={featuredProject.image} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt={featuredProject.name} />
                                    <div className="absolute inset-0 bg-celeste/20 mix-blend-overlay"></div>
                                    <div className="absolute top-8 left-8">
                                        <span className="bg-primary text-white text-[9px] font-black px-5 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-2xl">PROYECTO DESTACADO</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl border border-primary/5 animate-in fade-in duration-1000 hidden md:flex">
                                    <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest">Desde</span>
                                    <span className="text-2xl font-black text-primary font-serif italic">{formatPrice(featuredProject.base_price, 'USD')}</span>
                                </div>
                            </div>
                            <div className="lg:col-span-5 text-left space-y-10">
                                <h3 className="text-5xl md:text-7xl font-bold text-primary font-serif leading-[0.95] tracking-tighter italic">{featuredProject.name}</h3>
                                <p className="text-xl text-primary/60 font-medium leading-relaxed line-clamp-4">{featuredProject.description}</p>
                                <div className="grid grid-cols-2 gap-8 border-y border-primary/10 py-10">
                                    <div>
                                        <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-2">Ubicación</p>
                                        <p className="text-lg font-black text-primary">{featuredProject.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-2">ROI Proyectado</p>
                                        <p className="text-lg font-black text-primary">{featuredProject.roi}</p>
                                    </div>
                                </div>
                                <Link to={`/proyecto/${featuredProject.id}`} className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
                                    Explorar Activo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Asset Grid (White Background) */}
            <section className="py-32 md:py-48 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-24">
                        <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">NUESTRO PORTAFOLIO</span>
                        <h2 className="text-5xl md:text-7xl font-bold font-serif text-primary italic">Oportunidades Disponibles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {projects.map((proj) => (
                            <Link key={proj.id} to={`/proyecto/${proj.id}`} className="group bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5">
                                <div className="aspect-square relative overflow-hidden">
                                    <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={proj.image} alt={proj.name} />
                                    <div className="absolute inset-0 bg-celeste/10 mix-blend-overlay"></div>
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-primary/95 backdrop-blur text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest">{proj.status}</span>
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col items-start text-left flex-grow">
                                    <p className="text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] mb-3">{proj.location}</p>
                                    <h3 className="text-2xl font-bold mb-6 text-primary font-serif leading-tight">{proj.name}</h3>
                                    <div className="mt-auto w-full pt-6 border-t border-primary/5 flex justify-between items-center">
                                        <div>
                                            <p className="text-[8px] text-primary/40 font-bold uppercase mb-1">Inversión desde</p>
                                            <p className="font-black text-xl text-primary">{formatPrice(proj.base_price, 'USD')}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-almond flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">add</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Diversify (Generous Spacing) */}
            <section className="py-32 md:py-48 bg-almond px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-5xl md:text-7xl font-black text-primary font-serif italic leading-[0.95]">Por qué diversificar <br/> fuera de Europa</h2>
                    <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed">La presión fiscal y regulatoria limita cada vez más la rentabilidad. Te facilitamos acceso a mercados emergentes con mayor potencial y estructura profesional.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
                        {[
                            { icon: 'trending_down', title: '40% Below Market', desc: 'Precios directos de desarrollo sin sobrecostes.' },
                            { icon: 'security', title: 'Safe Framework', desc: 'Marco legal claro desde nuestra sede en Madrid.' },
                            { icon: 'public', title: 'Global Growth', desc: 'Activos en los destinos más rentables del mundo.' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                                <h4 className="text-lg font-black text-primary uppercase tracking-widest">{item.title}</h4>
                                <p className="text-sm text-primary/50 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
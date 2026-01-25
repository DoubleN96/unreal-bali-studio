import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCurrency } from '../App';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { formatPrice } = useCurrency();
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (data) setProjects(data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter(p => p.property_type === activeFilter);
    }, [projects, activeFilter]);

    const categories = ['All', ...new Set(projects.map(p => p.property_type))];

    if (loading) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary font-black uppercase text-xs tracking-widest">Cargando Activos...</div>;

    return (
        <div className="bg-almond min-h-screen pt-40 pb-40 px-6 md:px-12 font-sans selection:bg-primary selection:text-white text-left">
            <div className="max-w-7xl mx-auto">
                <header className="mb-32">
                    <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block italic">CURATED COLLECTION</span>
                    <h1 className="text-6xl md:text-9xl text-primary font-black mb-12 tracking-tighter font-serif italic leading-[0.85]">Propiedades</h1>
                    
                    <div className="flex flex-wrap gap-4 mt-16">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeFilter === cat ? 'bg-primary text-white border-primary shadow-xl' : 'bg-white/50 text-primary/60 border-primary/5 hover:bg-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24">
                    {filteredProjects.map((proj) => (
                        <Link key={proj.id} to={`/proyecto/${proj.id}`} className="group bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-sm hover:shadow-3xl transition-all duration-700 border border-primary/5 relative">
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" src={proj.image} alt={proj.name} />
                                <div className="absolute inset-0 bg-celeste/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-8 left-8">
                                    <span className="bg-primary text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl">{proj.status}</span>
                                </div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-primary/5">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-[8px] font-black text-primary/30 uppercase tracking-[0.2em] mb-2">{proj.location}</p>
                                                <h3 className="text-2xl font-black text-primary font-serif leading-none italic">{proj.name}</h3>
                                            </div>
                                            <div className="bg-almond px-3 py-1 rounded-lg text-primary font-black text-xs font-serif italic">{proj.roi}</div>
                                        </div>
                                        <div className="flex justify-between items-end border-t border-primary/5 pt-6">
                                            <div>
                                                <p className="text-[8px] text-primary/40 font-black uppercase mb-1 tracking-widest">Inversión desde</p>
                                                <p className="font-black text-xl text-primary font-serif italic">{formatPrice(proj.base_price, 'USD')}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
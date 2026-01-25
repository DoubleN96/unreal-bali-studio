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
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (data) setProject(data);
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const allImages = useMemo(() => {
        if (!project) return [];
        const list = [project.image];
        if (project.gallery_images) list.push(...project.gallery_images);
        return list.filter(img => img && img.length > 0);
    }, [project]);

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#80f20d]">Loading Asset...</div>;
    if (!project) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Asset not found.</div>;

    return (
        <div className="bg-[#F3E5D8] text-[#3F2305] selection:bg-[#80f20d] selection:text-[#3F2305] min-h-screen font-serif">
            {/* Cinematic Gallery */}
            <section className="relative h-[75vh] w-full overflow-hidden">
                <img src={allImages[activeImage]} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-700" alt={project.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F3E5D8] via-transparent to-transparent"></div>
                
                <div className="absolute bottom-12 left-6 md:left-12 right-6 flex justify-between items-end">
                    <div className="text-left animate-in slide-in-from-left-10 duration-700">
                        <span className="bg-[#80f20d] text-[#3F2305] text-[10px] uppercase font-bold px-3 py-1.5 rounded-full tracking-wide mb-4 inline-block font-sans">{project.property_type}</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-[#3F2305] mb-2 leading-tight">{project.name}</h1>
                        <div className="flex items-center text-[#3F2305]/60 text-sm font-medium font-sans">
                            <span className="material-symbols-outlined text-base mr-1 text-[#80f20d]">location_on</span>
                            {project.location}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {allImages.map((_, i) => (
                            <button key={i} onClick={() => setActiveImage(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeImage ? 'bg-[#80f20d] w-8' : 'bg-[#3F2305]/30'}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics Bar */}
            <div className="bg-[#80f20d] text-[#3F2305] py-8 px-6 md:px-12 shadow-xl relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-black/10">
                    {[
                        { label: 'Proj. ROI', value: project.roi, sub: project.roi_type },
                        { label: 'Starting Price', value: formatPrice(project.base_price, 'USD'), sub: 'USD' },
                        { label: 'Market Value', value: formatPrice(project.market_price || project.base_price * 1.2, 'USD'), sub: 'Estimated' },
                        { label: 'Status', value: project.status, sub: 'Development' }
                    ].map((m, i) => (
                        <div key={i} className="px-4 text-center md:text-left">
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1 font-sans">{m.label}</p>
                            <p className="text-3xl font-bold">{m.value}</p>
                            <p className="text-[10px] font-sans opacity-60 uppercase">{m.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-20 text-left">
                    <section>
                        <h2 className="text-4xl font-bold text-[#3F2305] mb-8">The Vision</h2>
                        <div className="prose prose-lg text-[#3F2305]/70 font-light font-sans max-w-none">
                            <p className="leading-relaxed">{project.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                            {[
                                { icon: 'beach_access', label: 'Dist. to Beach', value: project.distance_to_beach },
                                { icon: 'history', label: 'Leasehold', value: `${project.contract_years} Years` },
                                { icon: 'inventory_2', label: 'Availability', value: project.available_units },
                                { icon: 'construction', label: 'Progress', value: `${project.completion_percentage}%` }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white/80 p-6 rounded-2xl border border-black/5 shadow-sm">
                                    <div className="bg-[#80f20d]/10 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-[#80f20d]">{item.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-bold text-[#3F2305]/40 tracking-widest font-sans">{item.label}</p>
                                        <p className="font-bold text-[#3F2305] text-lg">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Investment Breakdown */}
                    <section className="bg-white/80 p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-sm">
                        <h3 className="text-3xl font-bold text-[#3F2305] mb-8">Investment Structure</h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-sm mb-3 font-sans">
                                    <span className="text-[#3F2305]/60">Capital Appreciation</span>
                                    <span className="text-[#80f20d] font-bold">High Growth</span>
                                </div>
                                <div className="w-full bg-black/5 rounded-full h-1.5">
                                    <div className="bg-[#80f20d] h-full rounded-full w-[85%] shadow-[0_0_10px_rgba(128,242,13,0.5)]"></div>
                                </div>
                            </div>
                            {project.investor_tiers && project.investor_tiers.map((tier, idx) => (
                                <div key={idx} className="flex justify-between items-center py-4 border-b border-black/5 last:border-0 font-sans text-[#3F2305]">
                                    <span className="text-[#3F2305]/80">{tier}</span>
                                    <span className="material-symbols-outlined text-[#80f20d] text-sm">check_circle</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Gallery Grid */}
                    <section>
                        <h3 className="text-3xl font-bold text-[#3F2305] mb-12">Architecture & Design</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {allImages.slice(1).map((img, i) => (
                                <div key={i} className={`rounded-2xl overflow-hidden shadow-xl ${i % 3 === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                                    <img src={img} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Villa Interior" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sticky Sidebar */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] border border-black/5 shadow-2xl text-left">
                            <h3 className="text-2xl font-bold text-[#3F2305] mb-8 pb-4 border-b border-black/5">Reserve Asset</h3>
                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#3F2305]/60 font-sans">Investment Yield</span>
                                    <span className="text-[#80f20d] bg-[#3F2305] px-2 py-1 rounded font-bold text-xl">{project.roi}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#3F2305]/60 font-sans">Leasehold</span>
                                    <span className="text-[#3F2305] font-bold">{project.contract_years} Years</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <a href="https://wa.me/6285217790692" target="_blank" rel="noopener noreferrer" className="w-full bg-[#80f20d] text-[#3F2305] py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all font-sans">
                                    <span className="material-symbols-outlined">chat</span> WhatsApp Expert
                                </a>
                                <button className="w-full bg-white text-[#3F2305] py-4 rounded-xl font-bold border border-black/10 flex items-center justify-center gap-2 hover:bg-[#F3E5D8]/20 transition-all font-sans">
                                    Request Brochure
                                </button>
                            </div>
                            <p className="text-[10px] text-[#3F2305]/40 mt-6 text-center uppercase tracking-widest font-sans">Secured by PMA Notary Laws</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;
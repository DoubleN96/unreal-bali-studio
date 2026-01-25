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

    const activeListingsCount = useMemo(() => projects.length, [projects]);
    const avgROI = useMemo(() => {
        if (!projects.length) return "14.2%";
        const rois = projects.map(p => parseFloat(p.roi)).filter(r => !isNaN(r));
        if (!rois.length) return "14.2%";
        return (rois.reduce((a, b) => a + b, 0) / rois.length).toFixed(1) + "%";
    }, [projects]);

    return (
        <div className="bg-[#F3E5D8] text-[#3F2305] selection:bg-[#80f20d] selection:text-[#3F2305] overflow-x-hidden antialiased font-sans">
            {/* Hero Section */}
            <header className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000')" }}></div>
                <div className="absolute inset-0 bg-[#F3E5D8]/40 z-10"></div>
                <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center max-w-4xl pt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <span className="inline-block px-3 py-1 mb-6 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-xs font-bold tracking-wider uppercase text-[#3F2305]">
                        Exclusive Presale Live
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8 text-[#3F2305] font-serif">
                        THE FUTURE OF <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F2305] to-[#3F2305]/60">BALI LIVING</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#3F2305]/80 max-w-2xl mb-10 font-light leading-relaxed">
                        High-yield luxury real estate investment in the heart of Indonesia. Experience unreal returns with buttery smooth management.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <a href="https://wa.me/6285217790692" target="_blank" rel="noopener noreferrer" className="h-14 px-8 rounded-full bg-[#80f20d] text-[#3F2305] text-base font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(128,242,13,0.4)] transition-all duration-300">
                            <span className="material-symbols-outlined">chat</span>
                            Inquire via WhatsApp
                        </a>
                        <Link to="/proyectos" className="h-14 px-8 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[#3F2305] text-base font-bold flex items-center justify-center gap-3 hover:bg-white transition-all duration-300">
                            View Assets
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <span className="material-symbols-outlined text-[#3F2305]/50 text-3xl">keyboard_arrow_down</span>
                </div>
            </header>

            {/* ROI Dashboard Section */}
            <section className="py-20 bg-white/50 border-y border-[#3F2305]/5" id="roi">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="text-left">
                            <h2 className="text-4xl font-bold mb-2 font-serif text-[#3F2305]">Market Performance</h2>
                            <p className="text-[#3F2305]/60">Real-time data from our managed portfolio in Canggu & Uluwatu.</p>
                        </div>
                        <button className="text-[#3F2305] hover:text-[#80f20d] flex items-center gap-2 text-sm font-bold transition-colors">
                            Download Full Report <span className="material-symbols-outlined text-lg">download</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Avg. Annual Yield', value: avgROI, icon: 'trending_up', sub: '+2.4% vs last year' },
                            { label: 'Occupancy Rate', value: '92%', icon: 'calendar_month', sub: 'Year-round average' },
                            { label: 'Capital Growth', value: '22%', icon: 'currency_exchange', sub: 'Land appreciation' },
                            { label: 'Total Managed', value: '$42M+', icon: 'verified', sub: 'Assets under mgmt' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-md border border-black/5 p-8 rounded-2xl group hover:border-[#80f20d]/50 transition-all duration-300 relative overflow-hidden text-left shadow-sm">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-[#3F2305] text-4xl">{stat.icon}</span>
                                </div>
                                <p className="text-[#3F2305]/50 text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</p>
                                <div className="text-5xl font-bold text-[#3F2305] mb-2 group-hover:text-[#80f20d] transition-colors">{stat.value}</div>
                                <p className="text-xs text-[#3F2305]/40">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Assets */}
            <section className="py-24 container mx-auto px-6" id="featured">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#3F2305] font-serif">Featured Assets</h2>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <Link to="/proyectos" className="text-[#3F2305] font-bold text-sm flex items-center gap-2 hover:underline">
                            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.slice(0, 3).map((proj) => (
                        <Link key={proj.id} to={`/proyecto/${proj.id}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer block shadow-xl">
                            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={proj.image} alt={proj.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute top-4 left-4">
                                <span className="bg-[#80f20d] text-[#3F2305] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">{proj.status}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="bg-white/95 backdrop-blur-md border border-black/5 p-5 rounded-xl text-left">
                                    <h3 className="text-2xl font-bold mb-1 text-[#3F2305] font-serif">{proj.name}</h3>
                                    <p className="text-[#3F2305]/60 text-sm mb-4">{proj.location} • {proj.property_type}</p>
                                    <div className="flex justify-between items-center border-t border-black/5 pt-4">
                                        <div>
                                            <p className="text-xs text-[#3F2305]/50 uppercase">Starting Price</p>
                                            <p className="font-bold text-lg text-[#3F2305]">{formatPrice(proj.base_price, 'USD')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-[#3F2305]/50 uppercase">Proj. ROI</p>
                                            <p className="font-bold text-lg text-[#80f20d]">{proj.roi}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Investment Process Timeline */}
            <section className="py-24 bg-white/30 overflow-hidden" id="process">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-16 text-center text-[#3F2305] font-serif">Seamless Investment Process</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-black/5 z-0"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { icon: 'travel_explore', title: 'Select Asset', desc: 'Browse our curated collection of off-plan and turnkey properties.' },
                                { icon: 'gavel', title: 'Legal Securement', desc: 'Sign the PMA-backed contracts. We handle all notary and due diligence.' },
                                { icon: 'payments', title: 'Fund Transfer', desc: 'Transfer funds securely via crypto or fiat with transparent tracking.' },
                                { icon: 'key', title: 'Earn & Enjoy', desc: 'Receive keys or let our team generate monthly passive income for you.' }
                            ].map((step, i) => (
                                <div key={i} className="relative flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="w-24 h-24 rounded-full bg-[#F3E5D8] border-2 border-black/10 flex items-center justify-center mb-6 z-10 relative group hover:border-[#80f20d] transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-4xl text-[#3F2305] group-hover:text-[#80f20d] transition-colors">{step.icon}</span>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black/10 text-[#3F2305] font-bold flex items-center justify-center text-sm group-hover:bg-[#80f20d] transition-all">0{i+1}</div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-[#3F2305]">{step.title}</h3>
                                    <p className="text-[#3F2305]/60 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Journal Section */}
            <section className="py-24 container mx-auto px-6" id="journal">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-4xl font-bold text-[#3F2305] font-serif">The Journal</h2>
                    <Link to="/blog" className="hidden md:flex items-center gap-2 text-[#3F2305] text-sm font-bold hover:underline">
                        View All Articles <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {blogs.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="group cursor-pointer flex flex-col block">
                            <div className="overflow-hidden rounded-xl mb-6 aspect-video shadow-lg">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={post.image} alt={post.title} />
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-[#3F2305]/50 mb-3 uppercase tracking-wide">
                                <span>{post.tag}</span>
                                <span className="w-1 h-1 rounded-full bg-black/10"></span>
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-[#80f20d] text-[#3F2305] transition-colors leading-tight font-serif">{post.title}</h3>
                            <p className="text-[#3F2305]/60 text-sm line-clamp-3 leading-relaxed">{post.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
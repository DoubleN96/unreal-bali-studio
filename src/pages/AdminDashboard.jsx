import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCurrency } from '../App';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeView, setActiveView] = useState('assets');
    const [loading, setLoading] = useState(true);
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    // Editor States
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const checkAuth = () => {
            const session = localStorage.getItem('_ust_sh_');
            if (!session) {
                navigate('/admin/login');
            }
        };
        checkAuth();
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
            const { data: blogData } = await supabase.from('blogs').select('*').order('date', { ascending: false });
            if (projData) setProjects(projData);
            if (blogData) setBlogs(blogData);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('_ust_sh_');
        navigate('/admin/login');
    };

    const openEdit = (proj = null) => {
        setCurrentProject(proj || {
            name: '',
            location: 'Canggu',
            property_type: 'Villa',
            description: '',
            base_price: 0,
            status: 'En Construcción',
            roi: '15%',
            roi_type: 'Bruto/año',
            is_featured: false,
            completion_percentage: 0,
            contract_years: 25,
            available_units: '5/10',
            distance_to_beach: '500m',
            image: ''
        });
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentProject.id) {
                await supabase.from('projects').update(currentProject).eq('id', currentProject.id);
            } else {
                await supabase.from('projects').insert([currentProject]);
            }
            setIsEditing(false);
            fetchData();
        } catch (err) {
            alert('Error saving project.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this asset?')) {
            await supabase.from('projects').delete().eq('id', id);
            fetchData();
        }
    };

    const stats = useMemo(() => ({
        totalAssets: projects.length,
        avgROI: "14.8%",
        featured: projects.filter(p => p.is_featured).length,
        activeBlogs: blogs.length
    }), [projects, blogs]);

    return (
        <div className="min-h-screen bg-[#F3E5D8] text-[#3F2305] flex font-sans text-left">
            {/* Sidebar */}
            <aside className="w-64 border-r border-black/5 flex flex-col p-6 sticky top-0 h-screen bg-white/20 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-12">
                    <span className="material-symbols-outlined text-3xl text-[#80f20d] bg-[#3F2305] rounded p-1">pentagon</span>
                    <span className="text-xl font-bold tracking-tighter">UNREAL <span className="font-light text-[#3F2305]/40">CMS</span></span>
                </div>
                
                <nav className="space-y-2 flex-grow">
                    {[
                        { id: 'assets', label: 'Assets', icon: 'domain' },
                        { id: 'journal', label: 'Journal', icon: 'article' },
                        { id: 'users', label: 'Team', icon: 'group' },
                        { id: 'config', label: 'Settings', icon: 'settings' }
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === item.id ? 'bg-[#80f20d] text-[#3F2305] font-bold shadow-md' : 'text-[#3F2305]/60 hover:text-[#3F2305] hover:bg-white/40'}`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-black/5">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 w-full transition-colors font-bold text-xs uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold capitalize font-serif">{activeView} Management</h1>
                        <p className="text-[#3F2305]/40 text-sm">Manage your Bali real estate portfolio and content.</p>
                    </div>
                    {activeView === 'assets' && (
                        <button onClick={() => openEdit()} className="bg-[#80f20d] text-[#3F2305] px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
                            <span className="material-symbols-outlined">add</span> New Asset
                        </button>
                    )}
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Active Assets', value: stats.totalAssets, icon: 'list_alt' },
                        { label: 'Avg. Portfolio ROI', value: stats.avgROI, icon: 'trending_up' },
                        { label: 'Featured', value: stats.featured, icon: 'star' },
                        { label: 'Journal Posts', value: stats.activeBlogs, icon: 'edit_note' }
                    ].map((s, i) => (
                        <div key={i} className="bg-white/80 border border-black/5 p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest">{s.label}</span>
                                <span className="material-symbols-outlined text-[#80f20d] bg-[#3F2305] text-[14px] p-1 rounded-full">{s.icon}</span>
                            </div>
                            <div className="text-2xl font-bold text-[#3F2305]">{s.value}</div>
                        </div>
                    ))}
                </div>

                {activeView === 'assets' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {projects.map(proj => (
                            <div key={proj.id} className="bg-white rounded-2xl overflow-hidden group shadow-sm border border-black/5">
                                <div className="h-40 relative">
                                    <img src={proj.image} className="w-full h-full object-cover" alt={proj.name} />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className={`text-[8px] font-bold px-2 py-1 rounded uppercase ${proj.is_featured ? 'bg-[#80f20d] text-[#3F2305]' : 'bg-black/60 text-white'}`}>
                                            {proj.is_featured ? 'Featured' : 'Standard'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1 font-serif text-[#3F2305]">{proj.name}</h3>
                                    <p className="text-[#3F2305]/40 text-[10px] mb-4 uppercase tracking-widest">{proj.location}</p>
                                    <div className="flex justify-between items-center pt-4 border-t border-black/5">
                                        <div className="text-[#3F2305] font-bold text-sm bg-[#80f20d] px-2 py-0.5 rounded">{proj.roi} ROI</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(proj)} className="p-2 bg-black/5 rounded-lg hover:bg-black/10 transition-colors text-[#3F2305]">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => handleDelete(proj.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Placeholder views for others */}
                {activeView !== 'assets' && (
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-black/10 rounded-3xl text-[#3F2305]/40 italic">
                        {activeView.toUpperCase()} module integrated with Supabase. Refinement in progress.
                    </div>
                )}
            </main>

            {/* Slide-over Editor */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
                    <div className="bg-[#F3E5D8] w-full max-w-2xl h-full border-l border-black/10 p-8 overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-bold text-[#3F2305] font-serif">{currentProject.id ? 'Edit Asset' : 'Add New Asset'}</h2>
                            <button onClick={() => setIsEditing(false)} className="p-2 bg-white/40 rounded-full hover:bg-white/60 transition-all">
                                <span className="material-symbols-outlined text-[#3F2305]">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-8 pb-20 text-left">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Asset Name</label>
                                <input required value={currentProject.name} onChange={e => setCurrentProject({...currentProject, name: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] focus:ring-0 outline-none transition-all text-[#3F2305]" placeholder="e.g. Villa Nocturne" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Location</label>
                                    <input required value={currentProject.location} onChange={e => setCurrentProject({...currentProject, location: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] outline-none text-[#3F2305]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Type</label>
                                    <input required value={currentProject.property_type} onChange={e => setCurrentProject({...currentProject, property_type: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] outline-none text-[#3F2305]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Starting Price (USD)</label>
                                    <input type="number" required value={currentProject.base_price} onChange={e => setCurrentProject({...currentProject, base_price: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] outline-none text-[#3F2305]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Proj. ROI</label>
                                    <input required value={currentProject.roi} onChange={e => setCurrentProject({...currentProject, roi: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] outline-none text-[#3F2305]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Main Image URL</label>
                                <input required value={currentProject.image} onChange={e => setCurrentProject({...currentProject, image: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] outline-none text-[#3F2305]" placeholder="https://images.unsplash.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#3F2305]/40 tracking-widest ml-1">Description</label>
                                <textarea rows={5} value={currentProject.description} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-white/80 border border-black/10 rounded-xl px-5 py-4 focus:border-[#80f20d] outline-none resize-none text-[#3F2305]" placeholder="Vision and details..." />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={currentProject.is_featured} onChange={e => setCurrentProject({...currentProject, is_featured: e.target.checked})} className="w-5 h-5 rounded bg-white/80 border-black/10 text-[#80f20d] focus:ring-0" />
                                <label className="text-sm text-[#3F2305]/60 font-bold uppercase tracking-wider">Mark as Featured Asset</label>
                            </div>
                            <div className="pt-8 flex gap-4">
                                <button type="submit" className="flex-grow bg-[#80f20d] text-[#3F2305] py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:brightness-110 transition-all">Save Asset</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-8 bg-white text-[#3F2305] rounded-2xl font-bold border border-black/10 hover:bg-white/60 transition-all">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
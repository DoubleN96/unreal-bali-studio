import { useEffect, useState, useMemo, useRef } from 'react';
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
        if (window.confirm('¿Eliminar este activo?')) {
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
        <div className="min-h-screen bg-almond text-primary flex font-sans text-left selection:bg-primary selection:text-white">
            {/* Professional Sidebar */}
            <aside className="w-72 border-r border-primary/5 flex flex-col p-8 sticky top-0 h-screen bg-white shadow-2xl z-20">
                <div className="flex items-center gap-3 mb-16 px-2">
                    <span className="text-primary text-2xl font-black tracking-tighter">UNREAL</span>
                    <span className="text-primary/30 text-2xl font-light">CMS</span>
                </div>
                
                <nav className="space-y-3 flex-grow">
                    {[
                        { id: 'assets', label: 'Propiedades', icon: 'domain' },
                        { id: 'journal', label: 'Journal / Blog', icon: 'article' },
                        { id: 'users', label: 'Equipo', icon: 'group' },
                        { id: 'config', label: 'Ajustes', icon: 'settings' }
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border ${activeView === item.id ? 'bg-primary text-white border-primary shadow-xl font-bold' : 'text-primary/50 border-transparent hover:bg-almond/50'}`}
                        >
                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span className="text-sm uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-primary/5">
                    <button onClick={handleLogout} className="flex items-center gap-4 px-5 py-4 text-red-600 hover:bg-red-50 w-full rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.3em]">
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-12 overflow-y-auto bg-almond/30">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div>
                        <span className="text-primary/30 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block italic">GESTIÓN DE CONTENIDOS</span>
                        <h1 className="text-5xl font-black font-serif italic text-primary capitalize">{activeView}</h1>
                    </div>
                    {activeView === 'assets' && (
                        <button onClick={() => openEdit()} className="bg-primary text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 transition-all shadow-2xl">
                            <span className="material-symbols-outlined text-lg">add</span> Nuevo Activo
                        </button>
                    )}
                </header>

                {/* Performance Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Activos Vivos', value: stats.totalAssets, icon: 'list_alt' },
                        { label: 'Yield Cartera', value: stats.avgROI, icon: 'trending_up' },
                        { label: 'Destacados', value: stats.featured, icon: 'star' },
                        { label: 'Artículos', value: stats.activeBlogs, icon: 'edit_note' }
                    ].map((s, i) => (
                        <div key={i} className="bg-white border border-primary/5 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-primary text-4xl">{s.icon}</span>
                            </div>
                            <span className="text-[9px] uppercase font-black text-primary/30 tracking-widest mb-3 block">{s.label}</span>
                            <div className="text-4xl font-black text-primary font-serif italic">{s.value}</div>
                        </div>
                    ))}
                </div>

                {activeView === 'assets' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                        {projects.map(proj => (
                            <div key={proj.id} className="bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5">
                                <div className="h-48 relative">
                                    <img src={proj.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={proj.name} />
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                                    <div className="absolute top-6 left-6">
                                        <span className={`text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl ${proj.is_featured ? 'bg-primary text-white' : 'bg-white/90 text-primary'}`}>
                                            {proj.is_featured ? 'Destacado' : 'Estándar'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 text-left">
                                    <span className="text-primary/30 text-[9px] font-black uppercase tracking-widest mb-2 block">{proj.location}</span>
                                    <h3 className="text-2xl font-black mb-6 font-serif italic text-primary line-clamp-1">{proj.name}</h3>
                                    <div className="flex justify-between items-center pt-6 border-t border-primary/5">
                                        <div className="text-primary font-black text-lg font-serif italic">{proj.roi} ROI</div>
                                        <div className="flex gap-3">
                                            <button onClick={() => openEdit(proj)} className="p-3 bg-almond rounded-xl hover:bg-primary hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => handleDelete(proj.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeView !== 'assets' && (
                    <div className="h-96 flex flex-col items-center justify-center border-4 border-dashed border-primary/5 rounded-[3rem] text-primary/30 bg-white/50 space-y-4">
                        <span className="material-symbols-outlined text-6xl">construction</span>
                        <p className="font-serif italic text-xl">Módulo {activeView.toUpperCase()} en construcción</p>
                    </div>
                )}
            </main>

            {/* Premium Slide-over Editor */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end bg-primary/40 backdrop-blur-md transition-all duration-500">
                    <div className="bg-white w-full max-w-2xl h-full shadow-3xl p-12 overflow-y-auto animate-in slide-in-from-right duration-500 relative">
                        <header className="flex justify-between items-center mb-16">
                            <div>
                                <span className="text-primary/30 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block italic">PROYECTO EDITOR</span>
                                <h2 className="text-4xl font-black text-primary font-serif italic">{currentProject.id ? 'Editar Activo' : 'Crear Activo'}</h2>
                            </div>
                            <button onClick={() => setIsEditing(false)} className="w-12 h-12 bg-almond rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center group shadow-sm">
                                <span className="material-symbols-outlined transition-transform group-hover:rotate-90">close</span>
                            </button>
                        </header>

                        <form onSubmit={handleSave} className="space-y-10 pb-20">
                            <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Nombre del Activo</label>
                                <input required value={currentProject.name} onChange={e => setCurrentProject({...currentProject, name: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none transition-all text-primary font-bold text-lg" placeholder="e.g. Villa Nocturne" />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Ubicación</label>
                                    <input required value={currentProject.location} onChange={e => setCurrentProject({...currentProject, location: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Tipo</label>
                                    <input required value={currentProject.property_type} onChange={e => setCurrentProject({...currentProject, property_type: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none font-bold" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Precio Inversión (USD)</label>
                                    <input type="number" required value={currentProject.base_price} onChange={e => setCurrentProject({...currentProject, base_price: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">ROI (%)</label>
                                    <input required value={currentProject.roi} onChange={e => setCurrentProject({...currentProject, roi: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none font-bold" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">URL Imagen Principal</label>
                                <input required value={currentProject.image} onChange={e => setCurrentProject({...currentProject, image: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none" placeholder="https://images.unsplash.com/..." />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Descripción Editorial</label>
                                <textarea rows={6} value={currentProject.description} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-almond/50 border-2 border-transparent rounded-2xl px-8 py-5 focus:border-primary/20 focus:bg-white outline-none resize-none" placeholder="Visión y detalles técnicos..." />
                            </div>
                            <div className="flex items-center gap-4 bg-almond/30 p-6 rounded-2xl">
                                <input type="checkbox" checked={currentProject.is_featured} onChange={e => setCurrentProject({...currentProject, is_featured: e.target.checked})} className="w-6 h-6 rounded bg-white border-primary/20 text-primary focus:ring-0 cursor-pointer" />
                                <label className="text-xs font-black uppercase tracking-widest text-primary/60 cursor-pointer">Marcar como Activo Destacado</label>
                            </div>
                            <div className="pt-12 flex gap-6">
                                <button type="submit" className="flex-grow bg-primary text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:brightness-110 transition-all">Guardar Cambios</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-10 bg-almond rounded-2xl font-black text-xs uppercase tracking-[0.3em] border-2 border-transparent hover:border-primary/10 transition-all">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
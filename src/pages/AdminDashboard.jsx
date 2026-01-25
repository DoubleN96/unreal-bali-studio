import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCurrency } from '../App';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [leads, setLeads] = useState([]);
    const [activeView, setActiveView] = useState('assets');
    const [loading, setLoading] = useState(true);
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    // Editor States
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const session = localStorage.getItem('_ust_sh_');
            if (!session) navigate('/admin/login');
        };
        checkAuth();
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [pRes, bRes, lRes] = await Promise.all([
                supabase.from('projects').select('*').order('created_at', { ascending: false }),
                supabase.from('blogs').select('*').order('date', { ascending: false }),
                supabase.from('leads').select('*').order('created_at', { ascending: false })
            ]);
            if (pRes.data) setProjects(pRes.data);
            if (bRes.data) setBlogs(bRes.data);
            if (lRes.data) setLeads(lRes.data);
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

    // --- Image Upload Logic ---
    const handleFileUpload = async (e, target) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('unreal-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('unreal-media').getPublicUrl(filePath);
            
            if (target === 'project') {
                setCurrentProject({ ...currentProject, image: data.publicUrl });
            } else if (target === 'blog') {
                setCurrentBlog({ ...currentBlog, image: data.publicUrl });
            }
        } catch (error) {
            alert('Error al subir la imagen. Asegúrate de que el bucket "unreal-media" sea público.');
        } finally {
            setUploading(false);
        }
    };

    // --- CRUD Actions ---
    const openEditProject = (proj = null) => {
        setCurrentProject(proj || {
            name: '', location: 'Canggu', property_type: 'Villa', description: '',
            base_price: 0, status: 'En Construcción', roi: '15%', roi_type: 'Bruto/año',
            is_featured: false, completion_percentage: 0, contract_years: 25,
            available_units: '5/10', distance_to_beach: '500m', image: ''
        });
        setIsEditing(true);
    };

    const openEditBlog = (post = null) => {
        setCurrentBlog(post || {
            title: '', tag: 'MERCADO', description: '', content: '',
            date: new Date().toISOString().split('T')[0], image: ''
        });
        setIsEditing(true);
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            if (currentProject.id) {
                await supabase.from('projects').update(currentProject).eq('id', currentProject.id);
            } else {
                await supabase.from('projects').insert([currentProject]);
            }
            setIsEditing(false);
            fetchData();
        } catch (err) { alert('Error al guardar proyecto.'); }
    };

    const handleSaveBlog = async (e) => {
        e.preventDefault();
        try {
            if (currentBlog.id) {
                await supabase.from('blogs').update(currentBlog).eq('id', currentBlog.id);
            } else {
                await supabase.from('blogs').insert([currentBlog]);
            }
            setIsEditing(false);
            fetchData();
        } catch (err) { alert('Error al guardar artículo.'); }
    };

    const handleDelete = async (table, id) => {
        if (window.confirm('¿Eliminar definitivamente?')) {
            await supabase.from(table).delete().eq('id', id);
            fetchData();
        }
    };

    const stats = useMemo(() => ({
        totalAssets: projects.length,
        avgROI: "14.8%",
        leads: leads.length,
        activeBlogs: blogs.length
    }), [projects, blogs, leads]);

    return (
        <div className="min-h-screen bg-almond text-primary flex flex-col md:flex-row font-sans text-left selection:bg-primary selection:text-white">
            {/* Sidebar / Bottom Nav on Mobile */}
            <aside className="w-full md:w-72 border-r border-primary/5 flex flex-col p-6 md:p-8 md:sticky md:top-0 md:h-screen bg-white shadow-2xl z-20 overflow-hidden">
                <div className="flex items-center justify-between md:flex-col md:items-start md:mb-16 px-2">
                    <div className="flex items-center gap-3">
                        <span className="text-primary text-xl md:text-2xl font-black tracking-tighter">UNREAL</span>
                        <span className="text-primary/30 text-xl md:text-2xl font-light">CMS</span>
                    </div>
                    <button onClick={handleLogout} className="md:hidden text-red-600 font-black text-[10px] uppercase tracking-widest">Salir</button>
                </div>
                
                <nav className="flex md:flex-col gap-2 md:space-y-3 flex-grow mt-8 md:mt-0 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                    {[
                        { id: 'assets', label: 'Assets', icon: 'domain' },
                        { id: 'journal', label: 'Journal', icon: 'article' },
                        { id: 'leads', label: 'Leads', icon: 'contact_mail' },
                        { id: 'config', label: 'Setup', icon: 'settings' }
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => { setActiveView(item.id); setIsEditing(false); }}
                            className={`flex items-center gap-4 px-5 py-3 md:py-4 rounded-2xl transition-all border shrink-0 ${activeView === item.id ? 'bg-primary text-white border-primary shadow-xl font-bold' : 'text-primary/50 border-transparent hover:bg-almond/50'}`}
                        >
                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span className="text-xs md:text-sm uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="hidden md:block pt-8 border-t border-primary/5">
                    <button onClick={handleLogout} className="flex items-center gap-4 px-5 py-4 text-red-600 hover:bg-red-50 w-full rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.3em]">
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto bg-almond/30">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <div>
                        <span className="text-primary/30 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block italic">GESTIÓN ESTRATÉGICA</span>
                        <h1 className="text-4xl md:text-5xl font-black font-serif italic text-primary capitalize">{activeView}</h1>
                    </div>
                    {(activeView === 'assets' || activeView === 'journal') && (
                        <button onClick={() => activeView === 'assets' ? openEditProject() : openEditBlog()} className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl">
                            <span className="material-symbols-outlined text-lg">add</span> Añadir {activeView === 'assets' ? 'Activo' : 'Artículo'}
                        </button>
                    )}
                </header>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
                    {[
                        { label: 'Propiedades', value: stats.totalAssets, icon: 'list_alt' },
                        { label: 'Yield Med.', value: stats.avgROI, icon: 'trending_up' },
                        { label: 'Lead Flow', value: stats.leads, icon: 'hub' },
                        { label: 'Artículos', value: stats.activeBlogs, icon: 'edit_note' }
                    ].map((s, i) => (
                        <div key={i} className="bg-white border border-primary/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm relative overflow-hidden group">
                            <span className="text-[8px] md:text-[9px] uppercase font-black text-primary/30 tracking-widest mb-3 block">{s.label}</span>
                            <div className="text-2xl md:text-4xl font-black text-primary font-serif italic">{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* Assets View */}
                {activeView === 'assets' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {projects.map(proj => (
                            <div key={proj.id} className="bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5">
                                <div className="h-40 relative">
                                    <img src={proj.image} className="w-full h-full object-cover" alt={proj.name} />
                                    <div className="absolute top-4 left-4">
                                        <span className={`text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${proj.is_featured ? 'bg-primary text-white' : 'bg-white/90 text-primary'}`}>{proj.is_featured ? 'Destacado' : 'Estándar'}</span>
                                    </div>
                                </div>
                                <div className="p-8 text-left">
                                    <h3 className="text-xl font-black mb-4 font-serif italic text-primary">{proj.name}</h3>
                                    <div className="flex justify-between items-center pt-4 border-t border-primary/5">
                                        <div className="text-primary font-black text-sm italic">{proj.roi} ROI</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditProject(proj)} className="p-2.5 bg-almond rounded-xl hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                                            <button onClick={() => handleDelete('projects', proj.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><span className="material-symbols-outlined text-sm">delete</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Journal View */}
                {activeView === 'journal' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogs.map(post => (
                            <div key={post.id} className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center gap-6 border border-primary/5">
                                <img src={post.image} className="w-24 h-24 rounded-2xl object-cover grayscale" alt={post.title} />
                                <div className="text-left flex-grow">
                                    <span className="text-[8px] font-black text-primary/30 uppercase tracking-widest">{post.tag}</span>
                                    <h3 className="text-lg font-black font-serif italic text-primary leading-tight mb-4">{post.title}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditBlog(post)} className="text-[10px] font-black uppercase text-primary hover:underline">Editar</button>
                                        <button onClick={() => handleDelete('blogs', post.id)} className="text-[10px] font-black uppercase text-red-600 hover:underline">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Leads View */}
                {activeView === 'leads' && (
                    <div className="bg-white rounded-[2rem] border border-primary/5 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-8 py-6">Fecha</th>
                                    <th className="px-8 py-6">Nombre</th>
                                    <th className="px-8 py-6">Email</th>
                                    <th className="px-8 py-6">Mensaje</th>
                                    <th className="px-8 py-6">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map(lead => (
                                    <tr key={lead.id} className="border-b border-primary/5 hover:bg-almond/20 transition-colors">
                                        <td className="px-8 py-6 text-xs text-primary/40">{new Date(lead.created_at).toLocaleDateString()}</td>
                                        <td className="px-8 py-6 font-bold text-sm">{lead.name}</td>
                                        <td className="px-8 py-6 text-sm italic">{lead.email}</td>
                                        <td className="px-8 py-6 text-xs max-w-xs truncate">{lead.message}</td>
                                        <td className="px-8 py-6"><span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest">{lead.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Asset / Blog Editor Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end bg-primary/40 backdrop-blur-md">
                    <div className="bg-white w-full max-w-2xl h-full shadow-3xl p-8 md:p-12 overflow-y-auto animate-in slide-in-from-right duration-500">
                        <header className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-black text-primary font-serif italic">Editor {activeView === 'assets' ? 'Activo' : 'Artículo'}</h2>
                            <button onClick={() => setIsEditing(false)} className="w-10 h-10 bg-almond rounded-full hover:rotate-90 transition-all flex items-center justify-center"><span className="material-symbols-outlined">close</span></button>
                        </header>

                        <form onSubmit={activeView === 'assets' ? handleSaveProject : handleSaveBlog} className="space-y-8 text-left">
                            <div className="space-y-4">
                                <label className="text-[9px] uppercase font-black text-primary/40 tracking-widest ml-2">Imagen Destacada</label>
                                <div className="flex items-center gap-6 p-6 bg-almond/30 rounded-3xl border-2 border-dashed border-primary/10">
                                    <img src={(activeView === 'assets' ? currentProject?.image : currentBlog?.image) || 'https://via.placeholder.com/150'} className="w-24 h-24 rounded-2xl object-cover shadow-lg" alt="Preview" />
                                    <div className="flex-grow">
                                        <input type="file" onChange={(e) => handleFileUpload(e, activeView === 'assets' ? 'project' : 'blog')} className="hidden" id="file-up" accept="image/*" />
                                        <label htmlFor="file-up" className="cursor-pointer bg-primary text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block hover:scale-105 transition-all">
                                            {uploading ? 'Subiendo...' : 'Subir Imagen'}
                                        </label>
                                        <p className="text-[8px] text-primary/30 mt-3 font-bold uppercase italic">Recomendado: 16:9 o 4:5 .JPG o .WEBP</p>
                                    </div>
                                </div>
                            </div>

                            {activeView === 'assets' ? (
                                <>
                                    <input required value={currentProject.name} onChange={e => setCurrentProject({...currentProject, name: e.target.value})} className="w-full bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-bold" placeholder="Nombre del Activo" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required value={currentProject.location} onChange={e => setCurrentProject({...currentProject, location: e.target.value})} className="bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-bold" placeholder="Ubicación" />
                                        <input required value={currentProject.property_type} onChange={e => setCurrentProject({...currentProject, property_type: e.target.value})} className="bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-bold" placeholder="Tipo" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="number" required value={currentProject.base_price} onChange={e => setCurrentProject({...currentProject, base_price: e.target.value})} className="bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-bold" placeholder="Precio USD" />
                                        <input required value={currentProject.roi} onChange={e => setCurrentProject({...currentProject, roi: e.target.value})} className="bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-bold" placeholder="ROI %" />
                                    </div>
                                    <textarea rows={4} value={currentProject.description} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-medium text-sm" placeholder="Descripción estratégica..." />
                                </>
                            ) : (
                                <>
                                    <input required value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} className="w-full bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-bold text-xl" placeholder="Título del Artículo" />
                                    <input required value={currentBlog.tag} onChange={e => setCurrentBlog({...currentBlog, tag: e.target.value})} className="w-full bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-black uppercase text-[10px] tracking-widest" placeholder="Tag (e.g. MERCADO, DISEÑO)" />
                                    <textarea rows={10} value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} className="w-full bg-almond/50 rounded-2xl px-6 py-4 focus:bg-white outline-none font-medium text-sm font-mono" placeholder="Contenido (Soporta HTML)..." />
                                </>
                            )}

                            <button type="submit" className="w-full bg-primary text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:brightness-110 transition-all">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
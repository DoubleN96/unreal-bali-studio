import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .order('date', { ascending: false });
                
                if (data) setBlogs(data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary font-black uppercase text-xs tracking-widest">Cargando Journal...</div>;

    return (
        <div className="bg-almond min-h-screen pt-40 pb-40 px-6 md:px-12 font-sans selection:bg-primary selection:text-white">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-32 max-w-4xl mx-auto">
                    <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.5em] mb-8 block italic">INSIGHTS & ANALYSIS</span>
                    <h1 className="text-7xl md:text-9xl text-primary font-black mb-10 tracking-tighter font-serif italic leading-[0.85]">The Journal</h1>
                    <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed max-w-2xl mx-auto">
                        Deep dives into the Bali real estate market, architectural trends, and offshore investment strategies.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
                    {blogs.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="group cursor-pointer flex flex-col text-left">
                            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-10 relative shadow-2xl grayscale transition-all duration-700 group-hover:grayscale-0">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="flex flex-col items-start px-2">
                                <div className="flex items-center gap-6 mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-primary px-3 py-1 rounded-full shadow-lg">{post.tag}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                <h2 className="text-3xl font-black text-primary mb-6 leading-tight group-hover:text-primary/70 transition-colors font-serif italic">{post.title}</h2>
                                <p className="text-primary/60 font-medium leading-relaxed line-clamp-3 mb-8">{post.description}</p>
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                                    Leer Más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
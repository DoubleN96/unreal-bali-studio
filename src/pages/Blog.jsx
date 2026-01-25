import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await supabase
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

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#80f20d]">Loading Journal...</div>;

    return (
        <div className="bg-[#F3E5D8] min-h-screen pt-32 pb-32 px-6 md:px-12 font-serif selection:bg-[#80f20d] selection:text-[#3F2305]">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-24 max-w-3xl mx-auto">
                    <span className="text-[#3F2305]/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block font-sans">Insights & Analysis</span>
                    <h1 className="text-6xl md:text-8xl text-[#3F2305] font-bold mb-8 tracking-tighter">The Journal</h1>
                    <p className="text-lg text-[#3F2305]/60 font-light leading-relaxed font-sans">
                        Deep dives into the Bali real estate market, architectural trends, and offshore investment strategies.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {blogs.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="group cursor-pointer flex flex-col text-left">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 relative shadow-xl">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-4 mb-4 font-sans">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#80f20d] bg-[#3F2305] px-2 py-0.5 rounded">{post.tag}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#3F2305]/20"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3F2305]/40">{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-[#3F2305] mb-4 leading-tight group-hover:text-[#80f20d] transition-colors">{post.title}</h2>
                                <p className="text-[#3F2305]/60 font-light leading-relaxed line-clamp-3 font-sans">{post.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
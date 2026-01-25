import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (data) setPost(data);
            } catch (err) {
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary font-black uppercase text-xs tracking-widest">Cargando Artículo...</div>;
    if (!post) return <div className="min-h-screen bg-almond flex items-center justify-center text-primary">Artículo no encontrado.</div>;

    return (
        <div className="bg-almond min-h-screen selection:bg-primary selection:text-white font-sans text-left">
            {/* Editorial Header */}
            <header className="pt-40 pb-20 px-6 md:px-12 border-b border-primary/5">
                <div className="max-w-4xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-primary/40 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest mb-12 group">
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span> Volver al Journal
                    </Link>
                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white bg-primary px-3 py-1 rounded-full">{post.tag}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-primary mb-12 font-serif italic leading-[0.9] tracking-tighter">
                        {post.title}
                    </h1>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-20">
                {/* Featured Image - Black and White Editorial */}
                <div className="rounded-[3rem] overflow-hidden shadow-3xl mb-24 grayscale hover:grayscale-0 transition-all duration-1000 aspect-video">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <article className="prose prose-xl prose-stone max-w-none text-primary/80 leading-relaxed font-medium">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Footer Section */}
                <div className="mt-32 pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-3xl">person</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-1">Escrito por</p>
                            <p className="font-bold text-primary">Unreal Studio Editorial</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                            <span className="material-symbols-outlined text-lg">share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
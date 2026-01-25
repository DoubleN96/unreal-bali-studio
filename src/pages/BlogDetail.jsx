import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (data) setPost(data);
            } catch (err) {
                console.error('Error fetching blog post:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#80f20d]">Loading Article...</div>;
    if (!post) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Post not found.</div>;

    return (
        <div className="bg-[#050505] min-h-screen font-serif selection:bg-[#80f20d] selection:text-black">
            <header className="relative h-[70vh] w-full overflow-hidden">
                <img src={post.image} className="absolute inset-0 w-full h-full object-cover" alt={post.title} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-20 max-w-7xl mx-auto text-left">
                    <span className="bg-[#80f20d] text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-8 font-sans">{post.tag}</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 leading-[0.95] tracking-tighter max-w-5xl">{post.title}</h1>
                    <div className="flex items-center gap-4 text-gray-400 font-sans text-sm">
                        <span>By Unreal Editorial</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#80f20d]"></span>
                        <span>{new Date(post.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </header>

            <article className="max-w-3xl mx-auto px-6 md:px-12 py-32 text-left">
                <div 
                    className="prose prose-invert prose-xl prose-p:text-gray-400 prose-p:font-light prose-p:font-sans prose-headings:text-white prose-a:text-[#80f20d] prose-strong:text-white max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content || post.description }}
                />
                
                <div className="mt-32 pt-12 border-t border-white/5">
                    <Link to="/blog" className="inline-flex items-center gap-3 text-[#80f20d] font-bold uppercase tracking-widest text-[10px] hover:gap-5 transition-all font-sans">
                        <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Journal
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
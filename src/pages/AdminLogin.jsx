import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.user) {
                localStorage.setItem('_ust_sh_', data.session.access_token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-almond flex items-center justify-center p-6 font-sans selection:bg-primary selection:text-white">
            <div className="w-full max-w-lg">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
                        <span className="text-primary text-3xl font-black tracking-tighter">UNREAL</span>
                        <span className="text-primary/30 text-3xl font-light">Studio</span>
                    </Link>
                    <span className="text-primary/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">PANEL DE CONTROL</span>
                    <h1 className="text-5xl font-black text-primary font-serif italic">Management Login</h1>
                </div>

                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-3xl border border-primary/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-almond rounded-bl-full opacity-50 -mr-16 -mt-16 transition-all duration-700 group-hover:w-40 group-hover:h-40"></div>
                    
                    <form onSubmit={handleLogin} className="space-y-10 relative z-10 text-left">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in duration-300">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Email Corporativo</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 text-xl">alternate_email</span>
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-almond/30 border-2 border-transparent rounded-2xl pl-14 pr-8 py-5 focus:border-primary/20 focus:bg-white outline-none transition-all text-primary font-bold" 
                                    placeholder="admin@unrealstudio.com" 
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Contraseña</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 text-xl">lock_open</span>
                                <input 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-almond/30 border-2 border-transparent rounded-2xl pl-14 pr-8 py-5 focus:border-primary/20 focus:bg-white outline-none transition-all text-primary font-bold" 
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-primary text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <span className="animate-spin material-symbols-outlined">sync</span>
                            ) : (
                                <>Acceder al Panel <span className="material-symbols-outlined text-sm">login</span></>
                            )}
                        </button>
                    </form>
                </div>
                
                <p className="mt-12 text-primary/30 text-[9px] uppercase font-black tracking-widest text-center">
                    Sistema de Gestión Exclusivo • Unreal Studio S.L.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
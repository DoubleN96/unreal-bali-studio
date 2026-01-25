import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            if (data.user) {
                // Store session for the ProtectedRoute check (which checks localStorage '_ust_sh_')
                // Ideally ProtectedRoute should check supabase.auth.getSession() but for compatibility with existing code:
                localStorage.setItem('_ust_sh_', btoa(`active_session_${data.user.id}_${Date.now()}`));
                navigate('/admin');
            }
        } catch (err) {
            setError(err.message || 'Access Denied. Invalid Credentials.');
            setPassword('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-serif">
            <div className="bg-white/[0.03] backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-lg w-full text-center">
                <div className="mb-12 animate-in fade-in zoom-in-95 duration-700">
                    <span className="material-symbols-outlined text-6xl text-[#80f20d] mb-4">pentagon</span>
                    <h1 className="text-3xl font-bold tracking-tighter text-white">UNREAL <span className="font-light">CMS</span></h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mt-4">Authorized Personnel Only</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="text-left space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                        <input 
                            type="email" 
                            required 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#80f20d] focus:ring-0 outline-none transition-all text-white font-medium placeholder:text-white/10"
                            placeholder="admin@unrealstudio.com"
                        />
                    </div>
                    <div className="text-left space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                        <input 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError('');
                            }}
                            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#80f20d] focus:ring-0 outline-none transition-all text-white font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl animate-shake">
                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{error}</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#80f20d] text-black py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Authenticate'}
                    </button>

                    <button type="button" onClick={() => navigate('/')} className="mt-10 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-[#80f20d] transition-colors flex items-center justify-center gap-2 mx-auto">
                        <span className="material-symbols-outlined text-xs">arrow_back</span> Return to Site
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-primary/5 pt-32 pb-16 px-6 font-sans selection:bg-primary selection:text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-10 text-left">
                        <Link to="/" className="flex items-baseline leading-none group">
                            <span className="text-primary text-3xl font-black tracking-tighter">UNREAL</span>
                            <span className="text-gray-silver text-3xl font-light ml-1">Studio</span>
                        </Link>
                        <p className="text-primary/60 font-medium leading-relaxed max-w-xs">
                            Estudio propio de arquitectura y desarrollo inmobiliario especializado en activos de alta rentabilidad en mercados emergentes.
                        </p>
                        <div className="flex gap-6">
                            {[
                                { name: 'WhatsApp', icon: 'chat', color: '#25D366', url: 'https://wa.me/6285217790692' },
                                { name: 'Instagram', icon: 'photo_camera', color: '#E4405F', url: 'https://instagram.com/unrealstudio' },
                                { name: 'Email', icon: 'alternate_email', color: '#3D2817', url: 'mailto:info@unrealstudio.es' }
                            ].map(social => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-white hover:bg-primary transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-xl">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-2 text-left">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 italic">Explorar</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Inicio', path: '/' },
                                { name: 'Proyectos', path: '/proyectos' },
                                { name: 'Journal', path: '/blog' },
                                { name: 'Contacto', path: '/contacto' },
                                { name: 'Portal Inversor', path: '/admin' }
                            ].map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-primary/60 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-2 text-left">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 italic">Legal</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Privacidad', path: '/privacidad' },
                                { name: 'Términos', path: '/terminos' },
                                { name: 'Cookies', path: '/cookies' }
                            ].map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-primary/60 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Office */}
                    <div className="md:col-span-4 text-left">
                        <div className="bg-almond/30 p-10 rounded-[2.5rem] border border-primary/5">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 italic">Sede Madrid</h4>
                            <p className="text-primary font-black text-xl font-serif italic mb-4">Unreal Studio S.L.</p>
                            <p className="text-primary/60 text-sm leading-relaxed mb-6 font-medium">
                                Calle de Jorge Juan, 28001 Madrid, España.
                            </p>
                            <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Horario: 09:00 - 18:00
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} Unreal Studio. Arquitectura & Inversión.
                    </p>
                    <p className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] flex items-center gap-2">
                        Designed for <span className="text-primary">Perfect Experience</span> <span className="material-symbols-outlined text-[10px]">pentagon</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
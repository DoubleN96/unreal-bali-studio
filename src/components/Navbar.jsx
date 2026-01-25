import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../App';
import { CURRENCIES } from '../constants';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { currency, setCurrency } = useCurrency();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-almond/95 backdrop-blur-xl h-16 border-primary/5 shadow-sm' : 'bg-transparent h-24 border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="flex items-baseline leading-none">
                        <span className="text-primary text-xl md:text-2xl font-black tracking-tighter">UNREAL</span>
                        <span className="text-gray-silver text-xl md:text-2xl font-light ml-1">Studio</span>
                    </div>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    {[
                        { name: 'Inicio', path: '/' },
                        { name: 'Proyectos', path: '/proyectos' },
                        { name: 'Blog', path: '/blog' },
                        { name: 'Contacto', path: '/contacto' },
                    ].map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary ${isActive(link.path) ? 'text-primary border-b border-primary/20 pb-1' : 'text-primary/60'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative group hidden sm:block">
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)} 
                            className="bg-white/50 border border-primary/10 rounded-full px-4 py-1.5 text-[10px] font-bold text-primary focus:ring-0 cursor-pointer hover:bg-white transition-all appearance-none pr-8"
                        >
                            {CURRENCIES.map(c => (
                                <option key={c.code} value={c.code}>{c.code}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none text-primary/40">expand_more</span>
                    </div>
                    
                    <Link to="/admin" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-white transition-all group">
                        <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">lock_open</span>
                    </Link>

                    <Link 
                        to="/contacto" 
                        className="bg-primary text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                    >
                        Agendar Llamada
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
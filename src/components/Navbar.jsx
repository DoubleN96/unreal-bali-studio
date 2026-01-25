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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-xl h-16 border-white/10' : 'bg-transparent h-24 border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className={`transition-all duration-500 text-[#80f20d] ${isScrolled ? 'scale-75' : 'scale-100'}`}>
                        <span className="material-symbols-outlined text-[36px]">pentagon</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-white text-xl font-bold tracking-tighter">UNREAL</span>
                        <span className="text-[#80f20d] text-[10px] font-bold tracking-[0.2em] uppercase">Studio</span>
                    </div>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    {[
                        { name: 'Assets', path: '/proyectos' },
                        { name: 'Journal', path: '/blog' },
                        { name: 'Contact', path: '/contacto' },
                    ].map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className={`text-[11px] font-bold uppercase tracking-widest transition-all hover:text-[#80f20d] ${isActive(link.path) ? 'text-[#80f20d]' : 'text-gray-400'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)} 
                            className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-bold text-[#80f20d] focus:ring-0 cursor-pointer hover:bg-white/10 transition-all appearance-none pr-8"
                        >
                            {CURRENCIES.map(c => (
                                <option key={c.code} value={c.code} className="bg-[#050505] text-white">{c.code}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none text-[#80f20d]">expand_more</span>
                    </div>
                    <Link 
                        to="/contacto" 
                        className="bg-[#80f20d] text-black px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(128,242,13,0.3)]"
                    >
                        Invest Now
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../App';

const CURRENCIES = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
    { code: 'INR', symbol: '₹' },
    { code: 'GBP', symbol: '£' },
    { code: 'AUD', symbol: 'A$' }
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMenuOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => setMenuOpen(false), [location]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-white py-4 shadow-xl' : 'bg-transparent py-8'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Brand */}
                <Link to="/" className="flex items-baseline leading-none group z-50">
                    <span className="text-primary text-2xl md:text-3xl font-black tracking-tighter transition-colors">UNREAL</span>
                    <span className={`text-2xl md:text-3xl font-light ml-1 transition-colors ${scrolled || mobileMenuOpen ? 'text-gray-400' : 'text-primary/40'}`}>Studio</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12">
                    {[
                        { name: 'Inicio', path: '/' },
                        { name: 'Proyectos', path: '/proyectos' },
                        { name: 'Journal', path: '/blog' },
                        { name: 'Contacto', path: '/contacto' }
                    ].map(link => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-primary/40'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 md:gap-6 z-50">
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
                        className="hidden sm:flex bg-primary text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                    >
                        Agendar Llamada
                    </Link>

                    {/* Mobile Burger Toggle */}
                    <button 
                        onClick={() => setMenuOpen(!mobileMenuOpen)}
                        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 lg:hidden"
                    >
                        <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed inset-0 bg-white z-40 transition-transform duration-700 lg:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="h-full flex flex-col items-center justify-center gap-12 px-6 pt-20">
                    {[
                        { name: 'Inicio', path: '/' },
                        { name: 'Proyectos', path: '/proyectos' },
                        { name: 'Journal', path: '/blog' },
                        { name: 'Contacto', path: '/contacto' },
                        { name: 'Portal Inversor', path: '/admin' }
                    ].map(link => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            className="text-4xl font-black text-primary font-serif italic tracking-tighter"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-12 w-full max-w-xs space-y-6">
                        <Link to="/contacto" className="block w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-2xl">
                            Agendar Llamada
                        </Link>
                        <div className="flex justify-center gap-4">
                            {CURRENCIES.map(c => (
                                <button key={c.code} onClick={() => setCurrency(c.code)} className={`text-xs font-black p-2 ${currency === c.code ? 'text-primary' : 'text-primary/20'}`}>
                                    {c.code}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
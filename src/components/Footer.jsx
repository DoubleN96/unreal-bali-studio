import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6 md:px-12 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-left">
                <div className="col-span-1">
                    <Link to="/" className="flex items-baseline leading-none text-primary group mb-8">
                        <span className="text-2xl font-black uppercase tracking-tighter font-montserrat">UNREAL</span>
                        <span className="text-2xl font-extralight ml-1 font-montserrat">Studio</span>
                    </Link>
                    <p className="text-primary/60 text-xs leading-relaxed max-w-xs font-medium">Inversión inmobiliaria inteligente y arquitectura premium en los destinos más rentables del mundo.</p>
                </div>
                <div>
                    <h5 className="font-black text-[10px] uppercase tracking-widest text-primary mb-6">Menú</h5>
                    <ul className="space-y-4 text-primary/50 text-[11px] font-bold uppercase tracking-wider">
                        <li><Link className="hover:text-primary transition" to="/">Inicio</Link></li>
                        <li><Link className="hover:text-primary transition" to="/proyectos">Proyectos</Link></li>
                        <li><Link className="hover:text-primary transition" to="/blog">Blog</Link></li>
                        <li><Link className="hover:text-primary transition" to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-black text-[10px] uppercase tracking-widest text-primary mb-6">Nuestras Sedes</h5>
                    <ul className="space-y-4 text-primary/50 text-[11px] font-bold tracking-wider mb-8">
                        <li>
                            <a href="https://maps.app.goo.gl/abmGvNJzsbuM3pxr5?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition">
                                <span className="material-symbols-outlined text-sm">location_on</span> C. de San Nicolás 17, Madrid
                            </a>
                        </li>
                        <li>
                            <a href="https://maps.app.goo.gl/bnYDvKsJu7GWdUfA8?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition">
                                <span className="material-symbols-outlined text-sm">location_on</span> Jl. Pratu Rai Madra No.15, Bali
                            </a>
                        </li>
                    </ul>
                    <div className="flex space-x-6">
                        <a href="https://wa.me/6285217790692" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition duration-300" aria-label="WhatsApp">
                            <span className="material-symbols-outlined text-xl">chat</span>
                        </a>
                        <Link to="/contacto" className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300" aria-label="Agendar Videollamada">
                            <span className="material-symbols-outlined text-xl">videocam</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-primary/30 border-t border-primary/5 pt-10">
                <p>© 2026 Unreal Studio Madrid. Todos los derechos reservados.</p>
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <Link className="hover:text-primary transition" to="/privacidad">Privacidad</Link>
                    <Link className="hover:text-primary transition" to="/terminos">Términos</Link>
                    <Link className="hover:text-primary transition flex items-center gap-1" to="/admin/login">
                        <span className="material-symbols-outlined text-xs">settings</span> Development
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

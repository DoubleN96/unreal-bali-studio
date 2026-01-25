import React from 'react';

const Contact = () => {
    return (
        <div className="bg-almond transition-colors duration-300 min-h-screen font-sans selection:bg-primary selection:text-white">
            <main className="px-6 md:px-12 pt-48 pb-32">
                <div className="max-w-5xl mx-auto text-center mb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <span className="text-primary/40 text-[10px] font-black uppercase tracking-[0.5em] mb-8 block italic">GET IN TOUCH</span>
                    <h1 className="text-6xl md:text-9xl leading-[0.85] text-primary mb-12 font-serif italic font-black tracking-tighter">
                        Hablemos de tu <br className="hidden md:block" />próxima inversión
                    </h1>
                    <p className="text-xl md:text-2xl text-primary/60 font-medium max-w-2xl mx-auto leading-relaxed">
                        Estamos aquí para resolver tus dudas y ayudarte a diversificar tu capital con seguridad desde nuestra sede en Madrid.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
                    <div className="lg:col-span-7 bg-white rounded-[3rem] p-10 md:p-20 shadow-3xl border border-primary/5 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-almond rounded-bl-[100%] -mr-20 -mt-20 opacity-50 z-0 transition-all duration-700 group-hover:w-96 group-hover:h-96"></div>
                        <div className="relative z-10 flex-grow">
                            <div className="w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center mb-12 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <span className="material-symbols-outlined text-4xl">calendar_month</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl text-primary mb-6 font-serif italic font-black">Agenda una reunión</h2>
                            <p className="text-xl text-primary/50 font-medium mb-16 max-w-md leading-relaxed">15 minutos para entender tu perfil y mostrarte oportunidades reales de inversión con ROI superior al 20%.</p>
                            
                            <div className="bg-almond/30 rounded-[2.5rem] p-10 border border-primary/5 mb-12">
                                <div className="flex items-center gap-6 mb-10 border-b border-primary/10 pb-8">
                                    <div className="relative">
                                        <img alt="Consultor" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-xl" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-black text-primary text-lg font-serif italic">Equipo de Inversión</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Videollamada • 15 min</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.3em]">Próximos huecos disponibles</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button className="py-4 px-5 rounded-2xl bg-white border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-widest shadow-sm">Mañana, 10:00</button>
                                        <button className="py-4 px-5 rounded-2xl bg-white border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-widest shadow-sm">Mañana, 12:30</button>
                                        <button className="py-4 px-5 rounded-2xl bg-white border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-widest shadow-sm">Jueves, 16:00</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="relative z-10 w-full bg-primary text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4">
                            Ver calendario completo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-primary text-white rounded-[3rem] p-12 shadow-3xl flex flex-col items-start text-left">
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-3 font-serif italic">
                                <span className="material-symbols-outlined text-almond">bolt</span> Contacto Rápido
                            </h3>
                            <div className="space-y-6 w-full">
                                <a className="flex items-center gap-6 p-6 bg-white/10 rounded-3xl hover:bg-white hover:text-primary transition-all group" href="mailto:hola@unrealstudio.com">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary/10 transition">
                                        <span className="material-symbols-outlined text-2xl">mail</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] uppercase font-black tracking-widest opacity-40 mb-1">Email</p>
                                        <span className="font-bold text-lg">hola@unrealstudio.com</span>
                                    </div>
                                </a>
                                <a className="flex items-center gap-6 p-6 bg-[#25D366] text-white rounded-3xl hover:brightness-110 transition-all group" href="https://wa.me/6285217790692" target="_blank" rel="noopener noreferrer">
                                    <div className="bg-white/20 p-4 rounded-2xl">
                                        <span className="material-symbols-outlined text-2xl">chat</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] uppercase font-black tracking-widest opacity-60 mb-1">WhatsApp</p>
                                        <span className="font-bold text-lg">Chat Directo</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/5 flex flex-col items-start text-left group">
                            <div className="flex items-start justify-between w-full mb-8">
                                <div>
                                    <h4 className="font-black text-2xl text-primary font-serif italic">Madrid, España</h4>
                                    <p className="text-[9px] uppercase font-black tracking-widest text-primary/30 mt-2 italic">Sede Central</p>
                                </div>
                                <div className="w-16 h-16 rounded-3xl overflow-hidden border border-primary/5 shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img alt="Madrid" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=200&h=200" />
                                </div>
                            </div>
                            <p className="text-lg text-primary/50 font-medium mb-10 leading-relaxed">C. de San Nicolás, 17, Centro<br/>28013 Madrid, España</p>
                            <a className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary border-b-2 border-primary/10 pb-1 hover:border-primary transition-all" href="https://maps.app.goo.gl/abmGvNJzsbuM3pxr5?g_st=ic" target="_blank" rel="noopener noreferrer">
                                Ver ubicación <span className="material-symbols-outlined text-xs ml-2">north_east</span>
                            </a>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/5 flex flex-col items-start text-left group">
                            <div className="flex items-start justify-between w-full mb-8">
                                <div>
                                    <h4 className="font-black text-2xl text-primary font-serif italic">Bali, Indonesia</h4>
                                    <p className="text-[9px] uppercase font-black tracking-widest text-primary/30 mt-2 italic">Operaciones Asia</p>
                                </div>
                                <div className="w-16 h-16 rounded-3xl overflow-hidden border border-primary/5 shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img alt="Bali" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200&h=200" />
                                </div>
                            </div>
                            <p className="text-lg text-primary/50 font-medium mb-10 leading-relaxed">Jl. Pratu Rai Madra No.15, Cemagi, Kec. Mengwi<br/>Kabupaten Badung, Bali, Indonesia</p>
                            <a className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary border-b-2 border-primary/10 pb-1 hover:border-primary transition-all" href="https://maps.app.goo.gl/bnYDvKsJu7GWdUfA8?g_st=ic" target="_blank" rel="noopener noreferrer">
                                Ver ubicación <span className="material-symbols-outlined text-xs ml-2">north_east</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
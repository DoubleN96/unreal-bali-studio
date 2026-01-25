import React from 'react';

const Contact = () => {
    return (
        <div className="bg-almond transition-colors duration-300 min-h-screen">
            <main className="px-6 md:px-12 pt-16 pb-24">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h1 className="text-5xl md:text-7xl leading-tight text-primary mb-8">
                        Hablemos de tu <br className="hidden md:block" />próxima inversión
                    </h1>
                    <p className="text-lg md:text-xl text-primary/70 font-light max-w-2xl mx-auto leading-relaxed">
                        Estamos aquí para resolver tus dudas y ayudarte a diversificar tu capital con seguridad.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch text-left">
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/5 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-almond rounded-bl-[100%] -mr-16 -mt-16 opacity-50 z-0"></div>
                        <div className="relative z-10 flex-grow">
                            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg rotate-3">
                                <span className="material-symbols-outlined text-3xl">calendar_month</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl text-primary mb-4">Agenda una reunión</h2>
                            <p className="text-lg text-gray-500 font-light mb-10 max-w-md">15 minutos para entender tu perfil y mostrarte oportunidades reales de inversión.</p>
                            
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                                <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
                                    <div className="relative">
                                        <img alt="Consultor" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary">Equipo de Inversión</p>
                                        <p className="text-xs text-gray-500">Videollamada • 15 min</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Próximos huecos disponibles</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        <button className="py-2.5 px-3 rounded-xl border border-primary/20 text-primary hover:bg-primary hover:text-white transition text-sm font-semibold">Mañana, 10:00</button>
                                        <button className="py-2.5 px-3 rounded-xl border border-primary/20 text-primary hover:bg-primary hover:text-white transition text-sm font-semibold">Mañana, 12:30</button>
                                        <button className="py-2.5 px-3 rounded-xl border border-primary/20 text-primary hover:bg-primary hover:text-white transition text-sm font-semibold">Jueves, 16:00</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="relative z-10 w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-3">
                            Ver calendario completo <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-[#EBE0D3] rounded-3xl p-8 border border-primary/5">
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-orange-600">bolt</span> Contacto Rápido
                            </h3>
                            <div className="space-y-4">
                                <a className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white transition group" href="mailto:hola@unrealstudio.com">
                                    <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition text-primary">
                                        <span className="material-symbols-outlined text-xl">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500">Correo Electrónico</p>
                                        <span className="font-medium text-primary">hola@unrealstudio.com</span>
                                    </div>
                                </a>
                                <a className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl hover:bg-white transition group" href="https://wa.me/6285217790692" target="_blank" rel="noopener noreferrer">
                                    <div className="bg-green-100 text-green-700 p-3 rounded-full group-hover:bg-green-600 group-hover:text-white transition">
                                        <span className="material-symbols-outlined text-xl">chat</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500">WhatsApp</p>
                                        <span className="font-medium text-primary">Chat Directo</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-primary/5 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="font-bold text-xl text-primary">Madrid, España</h4>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Sede Central</p>
                                </div>
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                                    <img alt="Madrid" className="w-full h-full object-cover grayscale opacity-80" src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=200&h=200" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 font-light mb-4 leading-relaxed">C. de San Nicolás, 17, Centro<br/>28013 Madrid, España</p>
                            <a className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1 hover:border-primary transition" href="https://maps.app.goo.gl/abmGvNJzsbuM3pxr5?g_st=ic" target="_blank" rel="noopener noreferrer">
                                Ver ubicación <span className="material-symbols-outlined text-sm ml-1">north_east</span>
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-primary/5 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="font-bold text-xl text-primary">Bali, Indonesia</h4>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Operaciones Asia</p>
                                </div>
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                                    <img alt="Bali" className="w-full h-full object-cover grayscale opacity-80" src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200&h=200" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 font-light mb-4 leading-relaxed">Jl. Pratu Rai Madra No.15, Cemagi, Kec. Mengwi<br/>Kabupaten Badung, Bali, Indonesia</p>
                            <a className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1 hover:border-primary transition" href="https://maps.app.goo.gl/bnYDvKsJu7GWdUfA8?g_st=ic" target="_blank" rel="noopener noreferrer">
                                Ver ubicación <span className="material-symbols-outlined text-sm ml-1">north_east</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;

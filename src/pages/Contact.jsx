import { useState } from 'react';
import { supabase } from '../supabaseClient';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const { error } = await supabase.from('leads').insert([formData]);
            if (error) throw error;
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error('Error sending message:', err);
            alert('Error al enviar el mensaje. Inténtalo de nuevo.');
            setStatus('idle');
        }
    };

    return (
        <div className="bg-almond transition-colors duration-300 min-h-screen font-sans selection:bg-primary selection:text-white">
            <main className="px-6 md:px-12 pt-32 md:pt-48 pb-32">
                <div className="max-w-5xl mx-auto text-center mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <span className="text-primary/40 text-[10px] font-black uppercase tracking-[0.5em] mb-6 md:mb-8 block italic">GET IN TOUCH</span>
                    <h1 className="text-5xl md:text-9xl leading-[0.9] text-primary mb-8 md:mb-12 font-serif italic font-black tracking-tighter">
                        Hablemos de tu <br className="hidden md:block" />próxima inversión
                    </h1>
                    <p className="text-lg md:text-2xl text-primary/60 font-medium max-w-2xl mx-auto leading-relaxed">
                        Estamos aquí para resolver tus dudas y ayudarte a diversificar tu capital con seguridad desde nuestra sede en Madrid.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
                    <div className="lg:col-span-7 bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-20 shadow-3xl border border-primary/5 flex flex-col relative overflow-hidden group">
                        {status === 'success' ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500 relative z-10">
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                                </div>
                                <h2 className="text-4xl font-black text-primary font-serif italic">¡Mensaje Recibido!</h2>
                                <p className="text-primary/60 font-medium max-w-xs">Nuestro equipo de inversión se pondrá en contacto contigo en menos de 24 horas.</p>
                                <button onClick={() => setStatus('idle')} className="text-primary font-black uppercase text-[10px] tracking-widest border-b-2 border-primary/20 pb-1">Enviar otro mensaje</button>
                            </div>
                        ) : (
                            <>
                                <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-almond rounded-bl-[100%] -mr-20 -mt-20 opacity-50 z-0 transition-all duration-700 group-hover:w-96 group-hover:h-96"></div>
                                <div className="relative z-10 flex-grow">
                                    <h2 className="text-3xl md:text-5xl text-primary mb-6 font-serif italic font-black">Envíanos un mensaje</h2>
                                    <p className="text-lg md:text-xl text-primary/50 font-medium mb-12 max-w-md leading-relaxed">Cuéntanos tus objetivos y uno de nuestros expertos te guiará personalmente.</p>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Nombre Completo</label>
                                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-almond/30 border-2 border-transparent rounded-2xl px-6 py-4 md:py-5 focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-primary" placeholder="Juan Pérez" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">Email de contacto</label>
                                            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-almond/30 border-2 border-transparent rounded-2xl px-6 py-4 md:py-5 focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-primary" placeholder="juan@empresa.com" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase font-black text-primary/40 tracking-[0.2em] ml-2">¿En qué podemos ayudarte?</label>
                                            <textarea rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-almond/30 border-2 border-transparent rounded-2xl px-6 py-4 md:py-5 focus:border-primary/20 focus:bg-white outline-none transition-all font-medium text-primary resize-none" placeholder="Me gustaría saber más sobre el ROI de las villas en Ubud..." />
                                        </div>
                                        <button type="submit" disabled={status === 'loading'} className="w-full bg-primary text-white py-5 md:py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                                            {status === 'loading' ? 'Enviando...' : 'Enviar Consulta'}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-primary text-white rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-12 shadow-3xl flex flex-col items-start text-left">
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
                                        <span className="font-bold text-base md:text-lg">hola@unrealstudio.com</span>
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

                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-primary/5 flex flex-col items-start text-left group">
                            <div className="flex items-start justify-between w-full mb-8">
                                <div>
                                    <h4 className="font-black text-2xl text-primary font-serif italic">Madrid, España</h4>
                                    <p className="text-[9px] uppercase font-black tracking-widest text-primary/30 mt-2 italic">Sede Central</p>
                                </div>
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-primary/5 shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img alt="Madrid" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=200&h=200" />
                                </div>
                            </div>
                            <p className="text-base md:text-lg text-primary/50 font-medium mb-10 leading-relaxed">C. de San Nicolás, 17, Centro<br/>28013 Madrid, España</p>
                            <a className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary border-b-2 border-primary/10 pb-1 hover:border-primary transition-all" href="https://maps.app.goo.gl/abmGvNJzsbuM3pxr5?g_st=ic" target="_blank" rel="noopener noreferrer">
                                Ver ubicación <span className="material-symbols-outlined text-xs ml-2">north_east</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;// Last build: Sun Jan 25 08:09:14 AM UTC 2026

import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { INITIAL_PROJECTS, DEFAULT_CONFIG } from '../constants';
import { useCurrency } from '../App';

const Projects = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [projects, setProjects] = useState([]);
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const { formatPrice, currency } = useCurrency();

    const formatInitialPrice = (val) => {
        if (!val) return '';
        return val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const [filters, setFilters] = useState({
        zone: searchParams.get('zone') || 'Cualquier zona',
        minPrice: formatInitialPrice(searchParams.get('minPrice')),
        maxPrice: formatInitialPrice(searchParams.get('maxPrice')),
        type: searchParams.get('type') || 'Cualquier tipo',
        sort: searchParams.get('sort') || 'asc'
    });

    useEffect(() => {
        const loadData = () => {
            const savedProjects = localStorage.getItem('unreal_projects');
            const savedConfig = localStorage.getItem('unreal_config');
            if (savedProjects) setProjects(JSON.parse(savedProjects));
            else setProjects(INITIAL_PROJECTS);
            
            if (savedConfig) setConfig(JSON.parse(savedConfig));
        };
        loadData();
        window.addEventListener('storage', loadData);
        return () => window.removeEventListener('storage', loadData);
    }, []);

    const filteredProjects = useMemo(() => {
        let result = projects.filter(p => {
            const zoneMatch = filters.zone === 'Cualquier zona' || p.location.toLowerCase().includes(filters.zone.toLowerCase());
            const typeMatch = filters.type === 'Cualquier tipo' || p.propertyType === filters.type;
            
            const rates = config.exchangeRates;
            const projectRate = rates[p.baseCurrency] || 1;
            const currentRate = rates[currency] || 1;
            const priceInCurrentCurrency = (p.basePrice / projectRate) * currentRate;
            
            const minVal = filters.minPrice.replace(/\./g, '');
            const maxVal = filters.maxPrice.replace(/\./g, '');
            const min = minVal ? parseFloat(minVal) : 0;
            const max = maxVal ? parseFloat(maxVal) : Infinity;
            
            const priceMatch = priceInCurrentCurrency >= min && priceInCurrentCurrency <= max;
            return zoneMatch && priceMatch && typeMatch;
        });
        
        result.sort((a, b) => {
            const rates = config.exchangeRates;
            const currentRate = rates[currency] || 1;
            const priceA = (a.basePrice / (rates[a.baseCurrency] || 1)) * currentRate;
            const priceB = (b.basePrice / (rates[b.baseCurrency] || 1)) * currentRate;
            if (filters.sort === 'asc') return priceA - priceB;
            if (filters.sort === 'desc') return priceB - priceA;
            return 0;
        });
        return result;
    }, [projects, filters, currency, config]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        
        const params = new URLSearchParams();
        if (newFilters.zone !== 'Cualquier zona') params.append('zone', newFilters.zone);
        if (newFilters.type !== 'Cualquier tipo') params.append('type', newFilters.type);
        if (newFilters.minPrice) params.append('minPrice', newFilters.minPrice.replace(/\./g, ''));
        if (newFilters.maxPrice) params.append('maxPrice', newFilters.maxPrice.replace(/\./g, ''));
        params.append('sort', newFilters.sort);
        setSearchParams(params);
    };

    const handlePriceChange = (key, value) => {
        const rawValue = value.replace(/[^0-9]/g, '');
        const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        handleFilterChange(key, formatted);
    };

    return (
        <div className="bg-almond transition-colors duration-300">
            <header className="px-6 md:px-12 pt-20 pb-28 text-center relative overflow-hidden bg-almond">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-primary tracking-tight">Proyectos y Oportunidades de Inversión</h1>
                    <p className="text-lg md:text-2xl text-primary/70 max-w-3xl mx-auto leading-relaxed font-light">Explora nuestra selección completa de activos inmobiliarios.</p>
                </div>
            </header>

            <div className="px-6 md:px-12 sticky top-4 z-40 -mt-12 mb-16">
                <div className="glass-card rounded-2xl md:rounded-3xl shadow-2xl border border-white/40 max-w-7xl mx-auto overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        <div className="flex flex-col space-y-2 p-4 md:p-8 border-r border-b md:border-b-0 border-gray-200">
                            <label className="block text-[9px] uppercase text-primary/40 font-black tracking-widest ml-1 h-4">Ordenar por</label>
                            <div className="relative w-full">
                                <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)} className="w-full bg-white/50 border border-primary/5 rounded-2xl py-2 md:py-4 px-3 md:px-5 font-bold text-primary appearance-none cursor-pointer pr-10 truncate bg-none text-xs md:text-base">
                                    <option value="asc">Precio: Ascendente</option>
                                    <option value="desc">Precio: Descendente</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-base">expand_more</span>
                            </div>
                        </div>
                        {/* More filters... simplified for brevity but matching original structure */}
                        <div className="flex flex-col space-y-2 p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
                            <label className="block text-[9px] uppercase text-primary/40 font-black tracking-widest ml-1 h-4">Precio (€)</label>
                            <div className="flex gap-2 w-full">
                                <input type="text" placeholder="Min" value={filters.minPrice} onChange={(e) => handlePriceChange('minPrice', e.target.value)} className="w-full bg-white/50 border border-primary/5 rounded-2xl py-2 md:py-4 px-3 md:px-5 font-bold text-primary appearance-none placeholder:text-gray-400 text-center text-xs md:text-base" />
                                <input type="text" placeholder="Max" value={filters.maxPrice} onChange={(e) => handlePriceChange('maxPrice', e.target.value)} className="w-full bg-white/50 border border-primary/5 rounded-2xl py-2 md:py-4 px-3 md:px-5 font-bold text-primary appearance-none placeholder:text-gray-400 text-center text-xs md:text-base" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 p-4 md:p-8 border-r md:border-r border-gray-200">
                            <label className="block text-[9px] uppercase text-primary/40 font-black tracking-widest ml-1 h-4">Zona</label>
                            <div className="relative w-full">
                                <select value={filters.zone} onChange={(e) => handleFilterChange('zone', e.target.value)} className="w-full bg-white/50 border border-primary/5 rounded-2xl py-2 md:py-4 px-3 md:px-5 font-bold text-primary appearance-none cursor-pointer pr-10 truncate bg-none text-xs md:text-base">
                                    <option>Cualquier zona</option>
                                    {config.customZones?.map(z => <option key={z} value={z}>{z}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-base">expand_more</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 p-4 md:p-8">
                            <label className="block text-[9px] uppercase text-primary/40 font-black tracking-widest ml-1 h-4">Tipo</label>
                            <div className="relative w-full">
                                <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="w-full bg-white/50 border border-primary/5 rounded-2xl py-2 md:py-4 px-3 md:px-5 font-bold text-primary appearance-none cursor-pointer pr-10 truncate bg-none text-xs md:text-base">
                                    <option>Cualquier tipo</option>
                                    {config.customTypes?.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-base">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                        {filteredProjects.map((proj) => (
                            <Link key={proj.id} to={`/proyecto/${proj.id}`} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-white/50">
                                <div className="relative h-32 md:h-80 overflow-hidden">
                                    <img alt={proj.name} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" src={proj.image} />
                                    <div className="absolute top-2 left-2 md:top-5 md:left-5 z-10">
                                        <span className="bg-primary/90 text-white text-[8px] md:text-[9px] font-black px-2 py-1 md:px-4 md:py-2 uppercase rounded-md md:rounded-full shadow-lg">{proj.status}</span>
                                    </div>
                                </div>
                                <div className="p-4 md:p-8 flex-1 flex flex-col text-left">
                                    <h3 className="text-sm md:text-3xl font-serif text-primary mb-2 md:mb-3 leading-tight line-clamp-2 md:line-clamp-none">{proj.name}</h3>
                                    <div className="mt-auto pt-3 md:pt-6 border-t border-primary/5 flex justify-between items-end">
                                        <div>
                                            <p className="text-[8px] md:text-[9px] uppercase text-primary/40 font-black tracking-widest mb-0.5 md:mb-1">Desde</p>
                                            <p className="font-extrabold text-sm md:text-xl text-primary">{formatPrice(proj.basePrice, proj.baseCurrency)}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-primary text-sm md:text-2xl">arrow_forward</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
                        <h3 className="text-2xl text-primary font-serif">No se encontraron resultados</h3>
                        <button onClick={() => setFilters({ zone: 'Cualquier zona', minPrice: '', maxPrice: '', type: 'Cualquier tipo', sort: 'asc' })} className="mt-6 text-primary font-bold border-b border-primary">Limpiar filtros</button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Projects;

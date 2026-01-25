export const DEFAULT_CONFIG = {
    labels: {
        distanceToBeach: 'Distancia Playa',
        availableUnits: 'Unidades Disponibles',
        completionPercentage: 'Progreso de Obra',
        contractYears: 'Contrato Leasehold',
        roi: 'ROI Proyectado',
        price: 'Precio Inversor',
        marketPrice: 'Precio Mercado'
    },
    customTypes: ['Villa', 'Loft', 'Apartamento', 'Terreno'],
    customZones: ['Uluwatu', 'Canggu', 'Tabanan', 'Pererenan', 'Seminyak'],
    customStatuses: ['En Construcción', 'Pre-Venta', 'Entregado', 'Últimas Unidades', 'Oportunidad de Co-inversión', 'Listo para Entrar'],
    exchangeRates: {
        EUR: 1,
        USD: 1.08,
        INR: 90.15,
        GBP: 0.83,
        AUD: 1.65
    }
};

export const CURRENCIES = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
    { code: 'INR', symbol: '₹' },
    { code: 'GBP', symbol: '£' },
    { code: 'AUD', symbol: 'A$' }
];

// Fallback data if DB is empty
export const INITIAL_PROJECTS = [];
export const INITIAL_BLOGS = [];

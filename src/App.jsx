import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import { DEFAULT_CONFIG } from './constants';

import Invest from './pages/Invest';

const CurrencyContext = createContext(undefined);

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
    return context;
};

const ProtectedRoute = ({ children }) => {
    const isAuth = !!localStorage.getItem('_ust_sh_');
    if (!isAuth) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
};

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
};

const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');
    // Hide navbar/footer for the landing page to keep it focused (like standard LPs)
    const isLandingPage = location.pathname === '/invest'; 
    
    return (
        <div className="flex flex-col min-h-screen">
            {(!isAdminPath && !isLandingPage) && <Navbar />}
            <main className="flex-grow">{children}</main>
            {(!isAdminPath && !isLandingPage) && <Footer />}
        </div>
    );
};

const App = () => {
    const [currentCurrency, setCurrentCurrency] = useState('EUR');
    const [config, setConfig] = useState(DEFAULT_CONFIG);

    useEffect(() => {
        const savedConfig = localStorage.getItem('unreal_config');
        if (savedConfig) setConfig(JSON.parse(savedConfig));
        
        // Fetch real rates if possible, or fallback to defaults
        const fetchRates = async () => {
            try {
                const res = await fetch('https://open.er-api.com/v6/latest/EUR');
                const data = await res.json();
                if (data && data.rates) {
                    const newRates = {
                        EUR: 1,
                        USD: data.rates.USD || 1.08,
                        INR: data.rates.INR || 90.15,
                        GBP: data.rates.GBP || 0.83,
                        AUD: data.rates.AUD || 1.65
                    };
                    setConfig(prev => {
                        const updated = { ...prev, exchangeRates: newRates };
                        localStorage.setItem('unreal_config', JSON.stringify(updated));
                        return updated;
                    });
                }
            } catch (e) {
                console.warn("Using default/cached rates.");
            }
        };
        fetchRates();
    }, []);

    const formatPrice = (amount, fromCurrency) => {
        const rates = config.exchangeRates;
        const amountInEur = amount / (rates[fromCurrency] || 1);
        const convertedAmount = amountInEur * (rates[currentCurrency] || 1);
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: currentCurrency,
            maximumFractionDigits: 0
        }).format(convertedAmount);
    };

    return (
        <CurrencyContext.Provider value={{ currency: currentCurrency, setCurrency: setCurrentCurrency, formatPrice }}>
            <Router>
                <ScrollToTop />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/proyectos" element={<Projects />} />
                        <Route path="/proyecto/:id" element={<ProjectDetail />} />
                        <Route path="/invest" element={<Invest />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/privacidad" element={<Privacy />} />
                        <Route path="/terminos" element={<Terms />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Layout>
            </Router>
        </CurrencyContext.Provider>
    );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/Toast';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Search from './pages/Search';
import ClusterPage from './pages/ClusterPage';
import Drops from './pages/Drops';

// Institutional Pages
import About from './pages/About';
import Contact from './pages/Contact';

import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';

// Support Pages
import SizeGuide from './pages/Support/SizeGuide';
import Shipping from './pages/Support/Shipping';
import Authenticity from './pages/Support/Authenticity';
import Legal from './pages/Support/Legal';
import Admin from './pages/Admin';
import Tracking from './pages/Tracking';
import FAQ from './pages/Support/FAQ';
import NotFound from './pages/NotFound';

function App() {
    return (
        <CartProvider>
        <ToastProvider>
            <div className="app">
                <Header />
                <ScrollToTop />
                <main>
                    <Routes>
                        {/* MASTER I.K.E.A STRUCTURE */}
                        <Route path="/" element={<Home />} />

                        {/* Deep Hierarchy Routes */}
                        <Route path="/:category" element={<ClusterPage />} />
                        <Route path="/:category/:brand" element={<ClusterPage />} />
                        <Route path="/:category/:brand/:model" element={<ClusterPage />} />
                        <Route path="/:category/:brand/:model/:slug" element={<Product />} />

                        {/* Legacy/Utility Routes */}
                        <Route path="/product/:id" element={<Product />} /> {/* Keep for backwards compat if needed */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/drops" element={<Drops />} />

                        <Route path="/nosotros" element={<About />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />

                        <Route path="/search" element={<Search />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/success" element={<Success />} />

                        <Route path="/guia-tallas" element={<SizeGuide />} />
                        <Route path="/envios" element={<Shipping />} />
                        <Route path="/autenticidad" element={<Authenticity />} />
                        <Route path="/terminos" element={<Legal />} />
                        <Route path="/privacidad" element={<Legal />} />

                        {/* Admin & Tools */}
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/tracking" element={<Tracking />} />
                        <Route path="/faq" element={<FAQ />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
                <CookieBanner />
                <WhatsAppWidget />
            </div>
        </ToastProvider>
        </CartProvider>
    );
}

export default App;

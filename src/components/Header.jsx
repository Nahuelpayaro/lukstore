import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <header className="header">
            <div className="container header-container">
                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo - Header Lockup (Clean) */}
                <Link to="/" className="logo">
                    <img src="/assets/logo-heritage.png" alt="LUKSTORE" className="logo-img" />
                </Link>

                {/* Navigation - Editorial/Reserved Structure */}
                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/zapatillas" className="nav-link" onClick={() => setIsMenuOpen(false)}>Zapatillas</Link>
                    <Link to="/hombre" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hombre</Link>
                    <Link to="/mujer" className="nav-link" onClick={() => setIsMenuOpen(false)}>Mujer</Link>
                    <Link to="/accesorios" className="nav-link" onClick={() => setIsMenuOpen(false)}>Accesorios</Link>
                    <Link to="/drops" className="nav-link" onClick={() => setIsMenuOpen(false)}>Drops</Link>
                    <Link to="/nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    {isSearchOpen ? (
                        <SearchInput onClose={() => setIsSearchOpen(false)} />
                    ) : (
                        <button className="icon-btn" onClick={() => setIsSearchOpen(true)}><Search size={22} /></button>
                    )}

                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingBag size={22} />
                        <span className="cart-count">{cartCount}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const SearchInput = ({ onClose }) => {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (term.trim()) {
            navigate(`/search?q=${encodeURIComponent(term)}`);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-form">
            <input
                autoFocus
                type="text"
                placeholder="Buscar..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onBlur={() => !term && onClose()}
                className="search-input"
            />
            <button type="button" onClick={onClose} className="search-close-btn"><X size={16} /></button>
        </form>
    );
};

export default Header;

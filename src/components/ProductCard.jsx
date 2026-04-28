import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { trackSelectItem } from '../utils/ecommerceTracker';

const WA_PHONE = "56948100032";

const ProductCard = ({ id, image, title, price, category, condition, discount, originalPrice, isDrop, hierarchy, slug, sizes }) => {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    let productUrl = `/product/${id}`;
    if (hierarchy && hierarchy.length >= 2 && slug) {
        const cat = hierarchy[0].toLowerCase();
        const brand = hierarchy[1].toLowerCase();
        const model = hierarchy.length > 2 ? hierarchy[2].toLowerCase().replace(/ /g, '-') : 'general';
        productUrl = `/${cat}/${brand}/${model}/${slug}`;
    }

    const handleClick = () => {
        trackSelectItem({ id, image, title, price, category, condition, discount, originalPrice, isDrop, hierarchy, slug, sizes }, "product_list", "Catálogo General/Recomendados");
    };

    const handleComprar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        trackSelectItem({ id, image, title, price, category, condition, discount, originalPrice, isDrop, hierarchy, slug, sizes }, "product_list", "Catálogo General/Recomendados");
        navigate(productUrl);
    };

    const handleConsultar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const priceFormatted = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
        const text = `Hola Lukstore! Quiero consultar sobre este producto: *${title}* - ${priceFormatted} 👟`;
        window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <Link to={productUrl} className="product-card" onClick={handleClick}>
            <div className={`product-image-container ${loading ? 'loading' : ''}`}>
                <img src={image} alt={title} className="product-image" onLoad={() => setLoading(false)} />
                <div className="card-badges">
                    {isDrop && <span className="badge badge-drop">DROP</span>}
                    {!isDrop && condition === 'new' && <span className="badge badge-new">NUEVO</span>}
                    {!isDrop && condition === 'used' && <span className="badge badge-used">USED</span>}
                    {/* The original discount badge was removed in the provided snippet, so we remove it here too. */}
                </div>

                {/* Heritage Isotype Overlay */}
                <div className="card-isotype">
                    <img src="/assets/logo-isotype.png" alt="" />
                </div>
            </div>
            <div className="product-info">
                <p className="product-category">{category} {condition === 'used' ? '• Used' : ''}</p>
                <h3 className="product-title">{title}</h3>
                <div className="price-row">
                    <p className="product-price">
                        {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)}
                    </p>
                    {originalPrice && (
                        <p className="product-price-original">
                            {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(originalPrice)}
                        </p>
                    )}
                </div>
                {sizes && sizes.length > 0 && (
                    <div className="card-sizes">
                        Tallas: {sizes.map(s => s.size).join(', ')}
                    </div>
                )}
                <div className="card-actions">
                    <button className="btn-comprar" onClick={handleComprar}>Comprar</button>
                    <button className="btn-consultar" onClick={handleConsultar}>Consultar</button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

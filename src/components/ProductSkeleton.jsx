import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton = () => (
    <div className="product-skeleton">
        <div className="skeleton-image" />
        <div className="skeleton-info">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line btn" />
        </div>
    </div>
);

export const ProductSkeletonGrid = ({ count = 4 }) => (
    <div className="product-grid">
        {Array.from({ length: count }).map((_, i) => (
            <ProductSkeleton key={i} />
        ))}
    </div>
);

export default ProductSkeleton;

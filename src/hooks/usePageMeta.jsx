import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { trackVirtualPageView } from '../utils/ecommerceTracker';

export const PageMeta = ({ title, description }) => {
    const fullTitle = `${title} | LUKSTORE`;
    const location = useLocation();
    const lastTrackedPath = useRef(null);

    useEffect(() => {
        document.title = fullTitle;

        const currentPath = location.pathname + location.search;
        if (lastTrackedPath.current === currentPath) return;
        lastTrackedPath.current = currentPath;

        trackVirtualPageView(window.location.href, fullTitle);
    }, [fullTitle, location.pathname, location.search]);

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || "Streetwear curado y esenciales vintage. Autenticados en Chile."} />
        </Helmet>
    );
};


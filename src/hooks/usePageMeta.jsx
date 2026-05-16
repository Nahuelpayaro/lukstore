import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { trackVirtualPageView } from '../utils/ecommerceTracker';

export const PageMeta = ({ title, description }) => {
    const fullTitle = `${title} | LUKSTORE`;

    useEffect(() => {
        document.title = fullTitle;
        trackVirtualPageView(window.location.href, fullTitle);
    }, [fullTitle]);

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || "Streetwear curado y esenciales vintage. Autenticados en Chile."} />
        </Helmet>
    );
};


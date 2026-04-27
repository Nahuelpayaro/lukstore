// siteConfig.js — Imágenes editoriales y banners del sitio.
//
// INSTRUCCIONES PARA EL CLIENTE:
// 1. Subir la foto a WordPress: inventario.lukstore.cl/wp-admin → Medios → Añadir nuevo
// 2. Hacer clic en la imagen subida → copiar la "URL del archivo"
// 3. Pegar esa URL en el campo correspondiente abajo (reemplazar el null)
// 4. Hacer push → Vercel redeploya automáticamente
//
// Mientras un campo sea null, el sitio muestra la imagen local de respaldo.

export const siteImages = {
    // Hero principal del home
    heroHome: null,

    // Banner "Nuevos Drops" (entre secciones de productos)
    bannerDrops: null,

    // Página /nosotros
    aboutHero:    null,
    aboutOrigins: null,

    // Página /contacto — foto showroom
    contactShowroom: null,

    // Fallback para heroes de colecciones sin imagen en WC
    clusterFallback: null,

    // Blog
    blog: {
        jordanBred: null,
        gamuza:     null,
        essentials: null,
    },
};

// Fallbacks locales — se usan automáticamente cuando siteImages[key] es null
const fallbacks = {
    heroHome:        '/assets/hero-bg.jpg',
    bannerDrops:     '/assets/banner-drops.png',
    aboutHero:       '/assets/hero-about.png',
    aboutOrigins:    '/assets/cat-streetwear.png',
    contactShowroom: '/assets/hero-street-editorial.png',
    clusterFallback: '/assets/hero-street-editorial.png',
    blog: {
        jordanBred: '/assets/hero-street-editorial.png',
        gamuza:     '/assets/cat-basketball.png',
        essentials: '/assets/cat-streetwear.png',
    },
};

// Uso: img('heroHome') | img('blog', 'jordanBred')
export const img = (key, subkey) => {
    const wpVal = subkey ? siteImages[key]?.[subkey] : siteImages[key];
    const fallback = subkey ? fallbacks[key]?.[subkey] : fallbacks[key];
    return wpVal || fallback || '/assets/hero-street-editorial.png';
};

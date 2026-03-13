
export const CATEGORY_CONTENT = {
    zapatillas: {
        hero: {
            title: "Basketball Heritage",
            subtitle: "Zapatillas que definieron la cultura y el juego.",
            cta: "Ver Todas",
            image: "/assets/cat-basketball.png"
        },
        editorialBanner: {
            title: "THE ICONS",
            copy: "Una selección curada de los modelos que marcaron un antes y un después en el diseño urbano.",
            image: "/assets/hero_red_thunder.png",
            ctaLink: "/zapatillas/jordan"
        },
        clusters: [
            { id: 'jordan', label: 'Jordan Retro', image: '/assets/prod-jordan1.png', link: '/zapatillas/jordan' },
            { id: 'airforce', label: 'Air Force 1', image: '/assets/products/airforce-skeleton-orange.webp', link: '/zapatillas/airforce' },
            { id: 'dunk', label: 'Nike Dunk', image: '/assets/prod-airmax.png', link: '/zapatillas/nike/dunk' },
            { id: 'yeezy', label: 'Yeezy', image: '/assets/jordan_13_navy_purple.png', link: '/zapatillas/adidas/yeezy' }
        ],
        blogPosts: [
            { id: 'historia-jordan-4-bred', title: 'La historia detrás de las Jordan 4 "Bred"', slug: 'historia-jordan-4-bred', tag: 'Cultura', image: '/assets/hero-street-editorial.png' },
            { id: 'cuidado-sneakers-gamuza', title: 'Cómo cuidar tus sneakers de gamuza', slug: 'cuidado-sneakers-gamuza', tag: 'Guías', image: '/assets/cat-basketball.png' }
        ],
        seo: {
            h1: "Zapatillas Urbanas y de Basketball en Chile",
            text: "Nuestra colección de Basketball Heritage no es solo nostalgia. Es rendimiento y estilo que trasciende la cancha. Encuentra desde Jordan Retro clásicas hasta las últimas firmas de atletas que están cambiando el juego hoy. Cada par en Lukstore es autenticado rigurosamente para garantizar que recibas calidad real.",
            faqs: [
                { q: "¿Son originales?", a: "Sí, todos nuestros productos son 100% auténticos y pasan por un proceso de verificación manual." },
                { q: "¿Hacen envíos a regiones?", a: "Realizamos envíos a todo Chile a través de Starken y Blue Express." }
            ]
        }
    },
    hombre: {
        hero: {
            title: "Streetwear Selected",
            subtitle: "Streetwear funcional. Corte, material y actitud.",
            cta: "Explorar",
            image: "/assets/cat-streetwear.png"
        },
        editorialBanner: {
            title: "ESSENTIALS '24",
            copy: "Prendas pensadas para resistir el uso diario sin sacrificar el fit perfecto.",
            image: "/assets/hero-street-editorial.png",
            ctaLink: "/hombre/essentials"
        },
        clusters: [
            { id: 'hoodies', label: 'Hoodies', image: '/assets/hoodie_navy_urban.png', link: '/hombre/hoodies' },
            { id: 'poleras', label: 'Poleras', image: '/assets/tshirt_white_tag.png', link: '/hombre/poleras' },
            { id: 'pantalones', label: 'Pantalones', image: '/assets/cat-streetwear.png', link: '/hombre/pantalones' }
        ],
        blogPosts: [
            { id: 'essentials-invierno', title: '5 prendas para este invierno', slug: 'essentials-invierno', tag: 'Estilo', image: '/assets/cat-streetwear.png' }
        ],
        seo: {
            h1: "Ropa de Hombre Streetwear en Chile",
            text: "El streetwear es más que logotipos. Es sobre la calidad del algodón, el corte oversized perfecto y la durabilidad de las prendas. En Lukstore seleccionamos hoodies, poleras y pantalones que resisten el uso diario con estilo.",
            faqs: [
                { q: "¿Cómo sé mi talla?", a: "Puedes revisar nuestra guía de tallas en el pie de página o consultarnos por Instagram." }
            ]
        }
    },
    mujer: {
        hero: {
            title: "Ellas en el Juego",
            subtitle: "Fuerza, Estilo y Cultura Sneaker.",
            cta: "Ver Colección",
            image: "/assets/jordan_4_cement_lifestyle.png"
        },
        editorialBanner: {
            title: "W EXCLUSIVE",
            copy: "Siluetas diseñadas exclusivamente para mujer, con paletas de colores únicas.",
            image: "/assets/jordan_11_low_citrus.png",
            ctaLink: "/mujer/jordan"
        },
        clusters: [
            { id: 'zapatillas-w', label: 'Zapatillas', image: '/assets/jordan_11_low_citrus.png', link: '/mujer/zapatillas' },
            { id: 'streetwear-w', label: 'Streetwear', image: '/assets/hero-home.png', link: '/mujer/ropa' }
        ],
        blogPosts: [
            { id: 'cuidado-sneakers-gamuza', title: 'Cómo cuidar tus sneakers de gamuza', slug: 'cuidado-sneakers-gamuza', tag: 'Guías', image: '/assets/cat-basketball.png' }
        ],
        seo: {
            h1: "Zapatillas y Streetwear para Mujer en Chile",
            text: "Una selección curada de zapatillas y streetwear pensada para ti. Jordan, Dunk y exclusivas en tallas W. Entendemos que la cultura sneaker no tiene género, por eso traemos lo mejor de la escena global.",
            faqs: [
                { q: "¿Tienen tallas pequeñas?", a: "Sí, contamos con tallaje desde el 5.5 US (GS) hasta tallas de mujer estándar." }
            ]
        }
    },
    drops: {
        hero: {
            title: "Limited Drops",
            subtitle: "Lanzamientos especiales. Cuando se acaban, no vuelven.",
            cta: "Ver Últimos",
            image: "/assets/cat-drops.png"
        },
        editorialBanner: {
            title: "LAST CALL",
            copy: "Últimas unidades de drops pasados con stock crítico.",
            image: "/assets/banner-drops.png",
            ctaLink: "/drops"
        },
        clusters: [
            { id: 'jordan-drops', label: 'Jordan Retro', image: '/assets/hero_red_thunder.png', link: '/drops' }
        ],
        blogPosts: [
            { id: 'historia-jordan-4-bred', title: 'La historia detrás de las Jordan 4 "Bred"', slug: 'historia-jordan-4-bred', tag: 'Cultura', image: '/assets/hero-street-editorial.png' }
        ],
        seo: {
            h1: "Drops de Zapatillas Exclusivas en Chile",
            text: "Acceso exclusivo a los pares más codiciados de la temporada. Nuestra sección de Limited Drops se actualiza semanalmente con stock muy limitado. Recomendamos activar notificaciones y estar atento a nuestro Instagram.",
            faqs: [
                { q: "¿Cuándo hay restock?", a: "Los drops son únicos. Una vez agotados, rara vez vuelven, a menos que consigamos un par individual en consignación." }
            ]
        }
    },
    accesorios: {
        hero: {
            title: "Essential Gear",
            subtitle: "Detalles que completan el fit.",
            cta: "Ver Accesorios",
            image: "/assets/banner-sale.png"
        },
        editorialBanner: {
            title: "CARE KIT",
            copy: "Todo lo necesario para mantener tus pares como el primer día.",
            image: "/assets/cat-basketball.png",
            ctaLink: "/accesorios/limpieza"
        },
        clusters: [
            { id: 'calcetines', label: 'Calcetines', image: '/assets/hoodie_navy_urban.png', link: '/accesorios/calcetines' },
            { id: 'gorros', label: 'Gorros', image: '/assets/cat-streetwear.png', link: '/accesorios/gorros' }
        ],
        blogPosts: [
            { id: 'cuidado-sneakers-gamuza', title: 'Guía de cuidado', slug: 'cuidado-sneakers-gamuza', tag: 'Guías', image: '/assets/cat-basketball.png' }
        ],
        seo: {
            h1: "Accesorios Streetwear y Cuidado de Zapatillas",
            text: "Complementos seleccionados para cerrar tu outfit. Desde gorros y calcetines hasta bolsos y joyería urbana. Calidad y diseño funcional.",
            faqs: [
                { q: "¿Venden productos de limpieza?", a: "Sí, trabajamos con marcas líderes en limpieza de calzado." }
            ]
        }
    }
};

export const getCategoryContent = (type) => {
    return CATEGORY_CONTENT[type.toLowerCase()] || null;
};

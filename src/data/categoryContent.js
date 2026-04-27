
export const CATEGORY_CONTENT = {
    zapatillas: {
        hero: {
            title: "Basketball Heritage",
            subtitle: "Zapatillas que definieron la cultura y el juego.",
            image: "/assets/cat-basketball.png"
        },
        clusters: [
            { id: 'jordan', label: 'Jordan Retro', image: '/assets/prod-jordan1.png', link: '/zapatillas/jordan' },
            { id: 'airforce', label: 'Air Force 1', image: '/assets/products/airforce-skeleton-orange.webp', link: '/zapatillas/airforce' },
            { id: 'dunk', label: 'Nike Dunk', image: '/assets/prod-airmax.png', link: '/zapatillas/nike/dunk' },
            { id: 'yeezy', label: 'Yeezy', image: '/assets/jordan_13_navy_purple.png', link: '/zapatillas/adidas/yeezy' }
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
            image: "/assets/cat-streetwear.png"
        },
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
            image: "/assets/jordan_4_cement_lifestyle.png"
        },
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
            image: "/assets/cat-drops.png"
        },
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
            image: "/assets/banner-sale.png"
        },
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
    return CATEGORY_CONTENT[type?.toLowerCase()] || null;
};

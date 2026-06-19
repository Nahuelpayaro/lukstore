export const BLOG_POSTS = [
    {
        id: 'guia-tallas-jordan',
        slug: 'guia-tallas-jordan',
        title: "Guía Definitiva de Tallas Jordan: ¿Cómo elegir tu número?",
        excerpt: "No te equivoques al comprar online. Aprende cómo tallan los Jordan 1, 3, 4 y 11 en comparación con otras marcas.",
        image: "/assets/banner-jordan.png", // Use general banner or specific if available
        date: "2024-05-15",
        category: "Guías",
        content: `
            <h2>¿Cómo tallan las Jordan? La pregunta del millón.</h2>
            <p>Comprar zapatillas limitadas online puede ser estresante si no estás seguro de tu talla. En esta guía, desglosamos el fit de cada silueta retro para que compres con confianza en Lukstore.</p>
            
            <h3>Jordan 1 (High, Mid, Low)</h3>
            <p><strong>Veredicto: True to Size (TTS)</strong></p>
            <p>El Jordan 1 es el estándar. Si eres talla 10 US en Nike Air Force 1, eres 10 US en Jordan 1. Si tienes el pie muy ancho, quizás quieras subir media talla, pero para el 90% de las personas, tu talla habitual es perfecta.</p>

            <h3>Jordan 4</h3>
            <p><strong>Veredicto: TTS (Ajustado)</strong></p>
            <p>Las Jordan 4 tienen mucho acolchado interior y una puntera algo estrecha debido a su diseño de 1989. Recomendamos tu talla habitual, pero si te gusta el calzado holgado o usas calcetines muy gruesos, sube media talla.</p>

            <h3>Jordan 11</h3>
            <p><strong>Veredicto: TTS</strong></p>
            <p>El charol puede ser rígido al principio, pero cede. Mantén tu talla normal.</p>

            <h3>Yeezy 350 V2</h3>
            <p><strong>Veredicto: Sube media talla (+0.5)</strong></p>
            <p>A diferencia de Nike, las Yeezy tienen un tejido Primeknit ajustado y una puntera baja. Siempre recomendamos subir al menos media talla (ej: si eres 10 US, compra 10.5 US).</p>

            <hr />
            <h3>Tabla de Conversión Rápida</h3>
            <p>Usa esta referencia para convertir tu talla EUR a US (Nike/Jordan):</p>
            <ul>
                <li>40 EUR = 7 US</li>
                <li>41 EUR = 8 US</li>
                <li>42 EUR = 8.5 US</li>
                <li>42.5 EUR = 9 US</li>
                <li>43 EUR = 9.5 US</li>
                <li>44 EUR = 10 US</li>
            </ul>
        `,
        seo: {
            title: "Guía de Tallas Jordan Chile - Evita Errores al Comprar",
            description: "Aprende si las Jordan 1 o 4 tallan grandes o pequeñas. Guía completa de tallas para comprar sneakers en Chile."
        }
    },
    {
        id: 'como-identificar-originales',
        slug: 'como-identificar-originales',
        title: "Legit Check: Cómo saber si tus Jordan son Originales",
        excerpt: "Aprende los puntos clave que nuestros expertos revisan: costuras, luz UV y olor.",
        image: "/assets/hero_red_thunder.png",
        date: "2024-05-10",
        category: "Educación",
        content: `
            <h2>El Arte de la Autenticación</h2>
            <p>El mercado de réplicas avanza rápido, pero hay detalles que la fabricación masiva no puede imitar a la perfección. En Lukstore revisamos cada par con cuidado, y aquí te enseñamos en qué fijarte.</p>

            <h3>1. La Caja y la Etiqueta</h3>
            <p>La fuente tipográfica de la etiqueta de la caja debe ser consistente. Las falsificaciones suelen tener letras muy gruesas o espaciado irregular. El código de estilo (ej: CT8527-016) debe coincidir con el zapato.</p>

            <h3>2. La Forma (Shape)</h3>
            <p>Un Jordan 1 High OG debe tener una forma de reloj de arena vista desde atrás (ancho arriba, estrecho en el tobillo, ancho en la suela). Muchos pares falsos son rectos como un tubo.</p>

            <h3>3. Olor</h3>
            <p>Puede sonar extraño, pero el pegamento tóxico usado en fábricas de réplicas tiene un olor muy fuerte y distintivo. Un par original huele a "nuevo", no a químicos agresivos.</p>
            
            <h3>4. Luz UV</h3>
            <p>Usamos luz ultravioleta para revelar marcas de guía invisibles o costuras reactivas que no deberían estar ahí.</p>

            <p><em>¿No quieres arriesgarte? Compra seguro en Lukstore. Authenticated in Chile.</em></p>
        `,
        seo: {
            title: "Cómo saber si mis Jordan son Originales - Guía Legit Check Chile",
            description: "Detecta zapatillas falsas con nuestra guía de expertos. Aprende a verificar tus Jordan y compra seguro en Lukstore."
        }
    }
];

export const getBlogPost = (slug) => BLOG_POSTS.find(p => p.slug === slug);

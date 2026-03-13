import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = '/Users/valgreen/Downloads/Inventario Lukstore .xlsx';
const productsJsPath = path.join(__dirname, '../src/data/products.js');

async function sync() {
    console.log('--- Starting Inventory Sync & Catalog Expansion ---');

    // 1. Read Excel
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelDataRaw = XLSX.utils.sheet_to_json(worksheet);

    // 2. Clean and group Excel data
    const inventoryMap = {};

    excelDataRaw.forEach(row => {
        const cleanedRow = {};
        Object.keys(row).forEach(key => cleanedRow[key.trim()] = row[key]);

        let title = (cleanedRow['Modelo'] || '').trim();
        if (!title) return;

        // Special handling for the grouped hoodie
        if (title.toLowerCase().includes('hoodie essentials x17')) {
            title = 'Hoodie Essentials'; // Use a generic name for the mapping
        }

        const brand = (cleanedRow['Marca'] || 'Various').trim();
        const price = parseInt(cleanedRow['PRECIO VENTA']) || 0;
        const size = String(cleanedRow['Talla'] || 'Única').trim();
        const units = parseInt(cleanedRow['Unidades']) || 0;

        if (!inventoryMap[title]) {
            inventoryMap[title] = {
                title,
                brand,
                price,
                sizes: {},
                totalStock: 0
            };
        }

        if (!inventoryMap[title].sizes[size]) {
            inventoryMap[title].sizes[size] = 0;
        }
        inventoryMap[title].sizes[size] += units;
        inventoryMap[title].totalStock += units;
    });

    console.log(`Loaded ${Object.keys(inventoryMap).length} distinct product titles from Excel.`);

    // 3. Read existing products
    const { PRODUCTS } = await import('../src/data/products.js');
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

    const manualMappings = {
        [normalize('airforce skeleton orange')]: normalize('af1 skeleton'),
        [normalize('jordan 6 midghtnavy')]: normalize('jordan 6 midnight'),
        [normalize('jordan 6 chorme')]: normalize('jordan 6 chrome'),
        [normalize('jordan 12 court purple')]: normalize('jordan 12 court pourple'),
        [normalize('vasos bearista 20.000 c-u')]: normalize('bearista osos'),
        [normalize('jordan 3 cyber monday')]: normalize('jordan 3 Monday'),
        [normalize('Hoodie essentials STRETCH LIMO')]: normalize('Hoodie Essentials'),
        [normalize('Hoodie essentials DARK oatmeal')]: normalize('Hoodie Essentials'),
        [normalize('Hoodie essentials LIGHT oatmeal')]: normalize('Hoodie Essentials')
    };

    const matchedExcelTitles = new Set();
    let totalUpdatedStock = 0;

    const updatedExistingProducts = PRODUCTS.map(product => {
        const jsTitle = product.title.trim().toLowerCase();
        const normJsTitle = normalize(jsTitle);
        const jsSlug = product.slug.toLowerCase().replace(/-/g, '');
        
        const excelTitles = Object.keys(inventoryMap);
        
        let excelTitleMatch = excelTitles.find(t => {
            const normEt = normalize(t);
            return manualMappings[normJsTitle] === normEt;
        });

        if (!excelTitleMatch) excelTitleMatch = excelTitles.find(t => t.toLowerCase().trim() === jsTitle);
        if (!excelTitleMatch) excelTitleMatch = excelTitles.find(t => normalize(t) === normJsTitle);
        if (!excelTitleMatch) excelTitleMatch = excelTitles.find(t => normalize(t) === jsSlug);
        if (!excelTitleMatch) {
            excelTitleMatch = excelTitles.find(t => {
                const normEt = normalize(t);
                return normJsTitle.includes(normEt) || normEt.includes(normJsTitle);
            });
        }

        if (excelTitleMatch) {
            matchedExcelTitles.add(excelTitleMatch);
            const excelData = inventoryMap[excelTitleMatch];
            
            // Format sizes
            const formattedSizes = Object.entries(excelData.sizes).map(([size, stock]) => {
                let s = size.toLowerCase().trim();
                if (!isNaN(s) && s !== '') s = s + ' us';
                if (s === 'unica' || s === 'reserva') s = 'Única';
                return { size: s, stock };
            });

            // For specific case of "Hoodie Essentials x17", distribute stock if matched to multiple
            // But here we'll just assign what's in Excel.
            
            const totalStock = formattedSizes.reduce((acc, curr) => acc + curr.stock, 0);
            totalUpdatedStock += totalStock;

            return {
                ...product,
                price: excelData.price || product.price,
                sizes: formattedSizes,
                stock: totalStock
            };
        }
        return product;
    });

    // 4. Create new products for remaining Excel titles
    const newProducts = [];
    Object.keys(inventoryMap).forEach(title => {
        if (!matchedExcelTitles.has(title)) {
            const excelData = inventoryMap[title];
            const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            const id = slug;

            const formattedSizes = Object.entries(excelData.sizes).map(([size, stock]) => {
                let s = size.toLowerCase().trim();
                if (!isNaN(s) && s !== '') s = s + ' us';
                if (s === 'unica') s = 'Única';
                return { size: s, stock };
            });

            newProducts.push({
                id,
                title: excelData.title,
                slug,
                price: excelData.price,
                sku: `NEW-${Math.floor(Math.random() * 10000)}`,
                stock: excelData.totalStock,
                image: `/assets/products/${slug}.webp`,
                images: [
                    `/assets/products/${slug}.webp`,
                    `/assets/products/${slug}-lifestyle.webp`
                ],
                condition: "new",
                isDrop: false,
                isFeatured: false,
                cluster: id,
                hierarchy: ["Zapatillas", excelData.brand],
                gender: "Unisex",
                seo: {
                    title: `${excelData.title} - Envíos a todo Chile`,
                    description: `Adquiere ${excelData.title} con opciones de envío.`
                },
                shortDescription: "Nuevo ingreso a catálogo desde inventario.",
                longDescription: "<p>Unidad disponible en inventario.</p>",
                specs: {
                    brand: excelData.brand,
                    model: title,
                    colorway: "Various",
                    releaseYear: "2024"
                },
                faq: [],
                sizes: formattedSizes
            });
        }
    });

    console.log(`Matched ${matchedExcelTitles.size} existing products.`);
    console.log(`Adding ${newProducts.length} new products from Excel.`);

    const finalProducts = [...updatedExistingProducts, ...newProducts];

    // 5. Write back to products.js
    const fileContent = `export const PRODUCTS = ${JSON.stringify(finalProducts, null, 4)};\n`;
    fs.writeFileSync(productsJsPath, fileContent);

    console.log('--- Sync & Expansion Completed Successfully ---');
}

sync().catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
});

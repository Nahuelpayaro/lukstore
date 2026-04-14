/**
 * excel-to-wc.mjs
 *
 * Convierte el Excel de inventario de Lukstore al formato CSV de WooCommerce.
 *
 * Uso:
 *   node scripts/excel-to-wc.mjs <ruta-del-excel.xlsx>
 *
 * Ejemplo:
 *   node scripts/excel-to-wc.mjs inventario.xlsx
 *
 * Genera: wc-products.csv (en la raíz del proyecto)
 */

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────

// Mapeá la marca del Excel → Categoría WooCommerce (padre > hijo)
const CATEGORY_MAP = {
    'jordan':       'Zapatillas > Jordan',
    'air jordan':   'Zapatillas > Jordan',
    'air force':    'Zapatillas > Air Force',
    'airforce':     'Zapatillas > Air Force',
    'air force 1':  'Zapatillas > Air Force',
    'nike':         'Zapatillas > Nike',
    'dunk':         'Zapatillas > Nike Dunk',
    'nike dunk':    'Zapatillas > Nike Dunk',
    'adidas':       'Zapatillas > Adidas',
    'yeezy':        'Zapatillas > Yeezy',
    'new balance':  'Zapatillas > New Balance',
    'nb':           'Zapatillas > New Balance',
    'puma':         'Zapatillas > Puma',
    'converse':     'Zapatillas > Converse',
    'vans':         'Zapatillas > Vans',
    'reebok':       'Zapatillas > Reebok',
    'asics':        'Zapatillas > Asics',
};

// Estado 1-5: datos internos del negocio, no se exportan al catálogo.

// Palabras clave en el Modelo que indican categoría específica
// (tienen prioridad sobre la Marca)
const MODEL_CATEGORY_OVERRIDE = [
    { keywords: ['hoodie', 'sudadera', 'sweatshirt'],        category: 'Ropa > Hoodies' },
    { keywords: ['polera', 'tshirt', 't-shirt', 'tee'],      category: 'Ropa > Poleras' },
    { keywords: ['pantalon', 'pants', 'jogger', 'tech'],      category: 'Ropa > Pantalones' },
    { keywords: ['gorro', 'cap', 'beanie', 'hat', 'coach'],  category: 'Accesorios > Gorros' },
    { keywords: ['calcetin', 'sock'],                         category: 'Accesorios > Calcetines' },
    { keywords: ['bolso', 'bag', 'mochila', 'backpack'],     category: 'Accesorios > Bolsos' },
    { keywords: ['vaso', 'mug', 'bearista', 'taza'],         category: 'Accesorios' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getCategory(marca, modelo) {
    const modelLower = (modelo ?? '').toLowerCase();

    // Primero: detectar por palabras clave del modelo
    for (const { keywords, category } of MODEL_CATEGORY_OVERRIDE) {
        if (keywords.some(kw => modelLower.includes(kw))) return category;
    }

    // Segundo: detectar por marca
    if (!marca) return 'Zapatillas';
    const key = marca.toLowerCase().trim();
    return CATEGORY_MAP[key] ?? `Zapatillas > ${capitalize(marca)}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getGenero(hombre, mujer) {
    const h = !!hombre && hombre !== '' && hombre !== 0;
    const m = !!mujer  && mujer  !== '' && mujer  !== 0;
    if (h && m) return 'Unisex';
    if (h)      return 'Hombre';
    if (m)      return 'Mujer';
    return 'Unisex';
}

function getCondicion(nueva, usada) {
    const n = !!nueva && nueva !== '' && nueva !== 0;
    const u = !!usada && usada !== '' && usada !== 0;
    if (n) return 'Nuevo';
    if (u) return 'Usado';
    return 'Nuevo';
}

function normalizeTalla(talla) {
    if (!talla && talla !== 0) return 'Única';
    return String(talla).trim();
}

function normalizePrice(price) {
    if (!price && price !== 0) return '';
    const num = parseFloat(String(price).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? '' : Math.round(num).toString();
}

function escapeCSV(value) {
    if (value === null || value === undefined) return '';
    const str = String(value);
    // Siempre envolvemos en comillas para evitar problemas con comas
    return `"${str.replace(/"/g, '""')}"`;
}

function generateSKU(marca, modelo, talla, index) {
    const m = (marca ?? 'XX').toUpperCase().replace(/\s+/g, '-').slice(0, 6);
    const mo = (modelo ?? 'XX').toUpperCase().replace(/\s+/g, '-').slice(0, 10);
    const t = String(talla ?? 'U').replace(/\s+/g, '');
    return `LUK-${m}-${mo}-${t}-${String(index).padStart(3, '0')}`;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('❌ Usá: node scripts/excel-to-wc.mjs <archivo.xlsx>');
    process.exit(1);
}

if (!fs.existsSync(inputFile)) {
    console.error(`❌ No se encontró el archivo: ${inputFile}`);
    process.exit(1);
}

console.log(`📂 Leyendo: ${inputFile}`);

const workbook = XLSX.readFile(inputFile);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

console.log(`📋 Sheet: "${sheetName}" — ${rows.length} filas encontradas`);

if (rows.length === 0) {
    console.error('❌ El Excel está vacío o no tiene datos.');
    process.exit(1);
}

// Mostrar las columnas detectadas para verificar el mapeo
console.log('📌 Columnas detectadas:', Object.keys(rows[0]).join(', '));
console.log('');

// ─── COLUMNAS ESPERADAS (normalizamos por si hay espacios/mayúsculas distintas) ──
// Buscamos por includes para tolerar variaciones como "Precio Compra USD" vs "PRECIO COMPRA USD"
function findCol(keys, searchTerms) {
    const k = keys.map(k => k.toLowerCase());
    for (const term of searchTerms) {
        const idx = k.findIndex(col => col.includes(term.toLowerCase()));
        if (idx !== -1) return keys[idx];
    }
    return null;
}

const sampleKeys = Object.keys(rows[0]);
const COL = {
    marca:      findCol(sampleKeys, ['marca']),
    modelo:     findCol(sampleKeys, ['modelo']),
    hombre:     findCol(sampleKeys, ['hombre']),
    mujer:      findCol(sampleKeys, ['mujer']),
    talla:      findCol(sampleKeys, ['talla', 'talle']),
    unidades:   findCol(sampleKeys, ['unidades', 'stock', 'cantidad']),
    nueva:      findCol(sampleKeys, ['nueva']),
    usada:      findCol(sampleKeys, ['usada']),
    precio:     findCol(sampleKeys, ['precio venta', 'precio_venta', 'venta']),
};

console.log('🗺️  Mapeo de columnas:');
Object.entries(COL).forEach(([key, val]) => {
    console.log(`   ${key.padEnd(12)} → ${val ?? '⚠️  NO ENCONTRADA'}`);
});
console.log('');

// ─── WooCommerce CSV HEADERS ──────────────────────────────────────────────────
// Ref: https://woocommerce.com/document/product-csv-importer-exporter/
const WC_HEADERS = [
    'ID',
    'Type',
    'SKU',
    'Name',
    'Published',
    'Is featured?',
    'Visibility in catalog',
    'Short description',
    'Description',
    'In stock?',
    'Stock',
    'Backorders allowed?',
    'Sold individually?',
    'Regular price',
    'Sale price',
    'Categories',
    'Tags',
    'Images',
    // Atributos
    'Attribute 1 name',
    'Attribute 1 value(s)',
    'Attribute 1 visible',
    'Attribute 1 global',
    'Attribute 2 name',
    'Attribute 2 value(s)',
    'Attribute 2 visible',
    'Attribute 2 global',
    'Attribute 3 name',
    'Attribute 3 value(s)',
    'Attribute 3 visible',
    'Attribute 3 global',
    'Attribute 4 name',
    'Attribute 4 value(s)',
    'Attribute 4 visible',
    'Attribute 4 global',
];

// ─── CONVERTIR FILAS ──────────────────────────────────────────────────────────
const wcRows = [];
let skipped = 0;

rows.forEach((row, idx) => {
    const marca  = row[COL.marca]  ?? '';
    const modelo = row[COL.modelo] ?? '';

    // Saltear filas sin datos esenciales
    if (!marca && !modelo) {
        skipped++;
        return;
    }

    const hombre   = row[COL.hombre]   ?? '';
    const mujer    = row[COL.mujer]    ?? '';
    const talla    = row[COL.talla]    ?? '';
    const unidades = row[COL.unidades] ?? 0;
    const nueva    = row[COL.nueva]    ?? '';
    const usada    = row[COL.usada]    ?? '';
    const precio   = row[COL.precio]   ?? '';

    // Si el modelo ya empieza con la marca, no duplicar (ej: "Jordan" + "Jordan 4 Bred" → "Jordan 4 Bred")
    const marcaClean = marca.trim();
    const modeloClean = modelo.trim();
    const modeloStartsWithMarca = modeloClean.toLowerCase().startsWith(marcaClean.toLowerCase());
    const name = modeloStartsWithMarca
        ? capitalize(modeloClean)
        : `${capitalize(marcaClean)} ${modeloClean}`.trim();
    const sku       = generateSKU(marca, modelo, talla, idx + 1);
    const genero    = getGenero(hombre, mujer);
    const condicion = getCondicion(nueva, usada);
    const category  = getCategory(marca, modelo);
    const stockNum  = 0;   // Historial de vendidos → todos agotados
    const inStock   = 0;
    const price     = normalizePrice(precio);
    const tallaNorm = normalizeTalla(talla);

    // Short description
    const shortDesc = [
        `Talle: ${tallaNorm}`,
        `Género: ${genero}`,
        `Condición: ${condicion}`,
    ].join(' | ');

    const wcRow = {
        'ID':                       '',
        'Type':                     'simple',
        'SKU':                      sku,
        'Name':                     name,
        'Published':                1,
        'Is featured?':             0,
        'Visibility in catalog':    'visible',
        'Short description':        shortDesc,
        'Description':              '',
        'In stock?':                inStock,
        'Stock':                    stockNum,
        'Backorders allowed?':      0,
        'Sold individually?':       1,
        'Regular price':            price,
        'Sale price':               '',
        'Categories':               category,
        'Tags':                     '',
        'Images':                   '',
        // Attr 1: Talle
        'Attribute 1 name':         'Talle',
        'Attribute 1 value(s)':     tallaNorm,
        'Attribute 1 visible':      1,
        'Attribute 1 global':       1,
        // Attr 2: Género
        'Attribute 2 name':         'Género',
        'Attribute 2 value(s)':     genero,
        'Attribute 2 visible':      1,
        'Attribute 2 global':       1,
        // Attr 3: Marca
        'Attribute 3 name':         'Marca',
        'Attribute 3 value(s)':     capitalize(marca.trim()),
        'Attribute 3 visible':      1,
        'Attribute 3 global':       1,
        // Attr 4: Condición
        'Attribute 4 name':         'Condición',
        'Attribute 4 value(s)':     condicion,
        'Attribute 4 visible':      1,
        'Attribute 4 global':       1,
    };

    wcRows.push(wcRow);
});

console.log(`✅ ${wcRows.length} productos procesados`);
if (skipped > 0) console.log(`⚠️  ${skipped} filas saltadas (sin Marca ni Modelo)`);

// ─── ESCRIBIR CSV ─────────────────────────────────────────────────────────────
const outputFile = path.join(process.cwd(), 'wc-products.csv');

const headerLine = WC_HEADERS.map(escapeCSV).join(',');
const dataLines  = wcRows.map(row =>
    WC_HEADERS.map(h => escapeCSV(row[h] ?? '')).join(',')
);

fs.writeFileSync(outputFile, [headerLine, ...dataLines].join('\n'), 'utf8');

console.log('');
console.log(`📄 CSV generado: ${outputFile}`);
console.log('');
console.log('📌 Próximos pasos:');
console.log('   1. Revisá el CSV en Excel para verificar que los datos quedaron bien');
console.log('   2. En WordPress: Productos → Importar → Subir el wc-products.csv');
console.log('   3. WooCommerce te va a mostrar la pantalla de mapeo de columnas');
console.log('      → Los headers ya están en inglés para que matcheen automáticamente');
console.log('   4. Después de importar, agregá las imágenes desde cada producto en WC');
console.log('');

const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/products.js');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/"image":\s*"(.*?)",\s*"images":\s*\[\s*p\.image,\s*p\.image\s*\]/g, (match, imagePath) => {
    return `"image": "${imagePath}",\n        "images": [\n            "${imagePath}",\n            "${imagePath}"\n        ]`;
});

fs.writeFileSync(file, content);
console.log("Fixed p.image syntax error in products.js");

const fs = require('fs');
const path = require('path');

const outputFileName = 'fileList.txt';
const dirPath = './';
let outputData = '';

const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file === outputFileName) return;

    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
        const content = fs.readFileSync(fullPath, 'utf8');
        outputData += `Name: ${file}, Ext: ${path.extname(file)}, Modified: ${stats.mtime}\nContent: ${content}\n---\n`;
    } else if (stats.isDirectory()) {
        outputData += `Directory: ${file}\nContents: ${fs.readdirSync(fullPath).join(', ')}\n---\n`;
    }
});

fs.writeFileSync(outputFileName, outputData);
console.log('Sync processing complete.');
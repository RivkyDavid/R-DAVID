const fs = require('fs');
const path = require('path');

const outputFileName = 'fileListAsync.txt';
const dirPath = './';

fs.readdir(dirPath, (err, files) => {
    if (err) throw err;

    let outputData = '';
    // מסננים את קובץ הפלט מראש מהרשימה
    const filesToProcess = files.filter(f => f !== outputFileName);
    let processed = 0;

    if (filesToProcess.length === 0) {
        console.log("No files to process.");
        return;
    }

    filesToProcess.forEach(file => {
        const fullPath = path.join(dirPath, file);

        fs.stat(fullPath, (err, stats) => {
            if (err) {
                console.log(`Skipping ${file}: ${err.code}`);
                processed++;
                if (processed === filesToProcess.length) finish();
                return;
            }

            if (stats.isFile()) {
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    outputData += `Name: ${file}, LstUpdate: ${stats.mtime}\nContent: ${data || "N/A"}\n***\n`;
                    processed++;
                    if (processed === filesToProcess.length) finish();
                });
            } else if (stats.isDirectory()) {
                // שימוש ב-readdir אסינכרוני עם נתיב מלא
                fs.readdir(fullPath, (err, subFiles) => {
                    outputData += `Directory: ${file}\nContents: ${err ? "Error" : subFiles.join(', ')}\n***\n`;
                    processed++;
                    if (processed === filesToProcess.length) finish();
                });
            } else {
                processed++;
                if (processed === filesToProcess.length) finish();
            }
        });
    });

    function finish() {
        fs.writeFile(outputFileName, outputData, (err) => {
            if (err) console.error("Error writing output file:", err);
            else console.log('Async processing complete! File created.');
        });
    }
});
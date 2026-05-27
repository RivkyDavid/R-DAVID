const { log } = require('console');
const fs = require('fs');
const path = require('path');

const fileName = 'fileList.txt';
const dirPath = './';
let outputData = '';

const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file === fileName) return;

    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
        const content = fs.readFileSync(fullPath, 'utf8');
        outputData += `Name: ${file}, EndName: ${path.extname(file)}, LstUpate: 
        ${stats.mtime}\nContent: ${content}\n***\n`;
    } else if (stats.isDirectory()) {
        outputData += `Directory: ${file}\nContents: ${fs.readdirSync(fullPath).join(', ')}
        \n***\n`;
    }
});

fs.writeFileSync(fileName, outputData);
console.log('Sync processing complete.');

const target=process.argv[2];
if(target){
    if(!fs.existsSync(target)){
    console.log("file not exist");  
}else{
    const stats=fs.statSync(target);

    if(stats.isFile()){
        fs.unlinkSync(target);
        console.log(`file ${target} deleted successfully`);    
    }else if(ststs.isDirectory()){
        fs.rmSync(target,{recursive:true,force:true});
        console.log(`diractory ${target} deleted successfully`);
        
    }
}     
}

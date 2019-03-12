const fs = require('fs');
const path = require('path');

const base = process.argv[2]||'./test';
const result = process.argv[3]||'./temp/subtemp/';
const removeBase = process.argv[4]||true;

const copyFile = (file) => {  

  const fileName = path.parse(file).base
  const newFolderName =  fileName.charAt(0).toUpperCase()

  if (!fs.existsSync(result+newFolderName)) {
    fs.mkdirSync(result+newFolderName, { recursive: true });
  } 

  console.log("start linkSync file " + file);
  fs.linkSync(file, path.join(result,newFolderName ,fileName));
  
    console.log("Start deleting " + file);
    console.log("rb " + removeBase);
    if (removeBase){
      fs.unlinkSync(file);
      
        console.log('Delete done! ' + file);
    }   
}

const readDir = (base, level, callback) => {
  const files = fs.readdirSync(base);  

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item);
      readDir(localBase, level + 1, removeBase => {
        if (removeBase){
          fs.rmdirSync(localBase);
            console.log('Delete done! ' + localBase);
        }
      });
      console.log("Start deleting " + localBase);
    } else {
      console.log(' '.repeat(level) + 'File: ' + item);
      copyFile(localBase)          
    }
  });
  callback(removeBase);
  
}

readDir(base, 0, tmp => {});
fs.rmdirSync(base);



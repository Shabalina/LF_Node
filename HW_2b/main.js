const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

  getData(file).then(data => {
    return writeFile(path.join(result,newFolderName ,fileName), data);
  })  
}

async function getData(file) {
  const file = await readFile(file)
  return file
}
/*async function getData(file){
  return await readFile(file)
}*/


const readDir = (base, level, callback) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item);
      readDir(localBase, level + 1, removeBase => {
        if (removeBase){
          removeFiles(localBase)
        }
      });
      
    } else {   
        console.log(' '.repeat(level) + 'File: ' + item)        
        copyFile(localBase)
        console.log('copied')
    }
  })  
  callback(removeBase);
}

const removeFiles = (path) => {
  console.log('in delete func')
  const lefts = fs.readdirSync(path);
  console.log(lefts.length, lefts)
  lefts.forEach(item => {
    console.log('now deleting ' + item)
    fs.unlinkSync(path.join(path, item))
    console.log('file deleted ' + item);
  })    
  fs.rmdirSync(path);
  console.log('Dir delete done! ' + path);
}



readDir(base, 0, tmp => {});




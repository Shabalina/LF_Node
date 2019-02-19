const fs = require('fs');
const path = require('path');

const base = './test';

const copyFile = (file) => {  

  const fileName = path.parse(file).base
  const newFolderName =  fileName.charAt(0).toUpperCase()

  if (!fs.existsSync('./temp/'+newFolderName)) {
    console.log('created')
    fs.mkdirSync('./temp/'+newFolderName, { recursive: true });
  } 

  fs.link(file, path.join('./temp/',newFolderName ,fileName), err => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('copied')
    fs.unlink(file, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(file + ' deleted')
      fs.rmdir(path.parse(file).dir, err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Delete done! ' + file);
      });
    })
  });  

  console.log(file)  
  /*
  fs.unlink(file, err => {
    if (err) {
      console.log(err);
      return;
    }
  })*/
}

const readDir = (base, level) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item);
      readDir(localBase, level + 1);
    } else {
      console.log(' '.repeat(level) + 'File: ' + item);
      copyFile(localBase)          
    }
  })
  
  
}

readDir(base, 0);



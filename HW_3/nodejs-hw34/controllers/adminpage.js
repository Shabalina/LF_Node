const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db')();


module.exports.getAdmin = (req, res, next) => {
  res.render('pages/admin', { title: 'Login' });
};

module.exports.uploadData = (req, res, next) => {
  let form = new formidable.IncomingForm();
  //let upload = path.join('./source/images', 'upload');
  let upload = path.join('./public/assets/img/', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  console.log(`dirname: ${__dirname}`);
  console.log(`cwd: ${process.cwd()}`);

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function (err, fields, files) {
    console.log(fields, files);
    if (err) {
      return next(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/?msg=${valid.status}`);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message);
        return;
      }

      let dir = fileName.substr(fileName.indexOf('\\'));

      var productArr = db.stores.file.store.productData || [];

      productArr.push({
        'src': dir,
        'name': fields.name,
        'price': fields.price
      });

      db.set('productData', productArr);
      db.save();
      res.redirect('/?msg=Картинка успешно загружена');
      
    });
  });
};

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  if (!fields.name || !fields.price) {
    return { status: 'Не указано описание картинки или цена!', err: true };
  }
  return { status: 'Ok', err: false };
};
    
module.exports.postSkills = (req, res) => {
  if (!req.body.age || !req.body.concerts || !req.body.cities || !req.body.years) {
    //output the alert message
    return res.redirect('/admin?msg=All fields should be filled!');
  }  

  db.set('skillsData', [
    {
      "number": req.body.age,
      "text": "Возраст начала занятий на скрипке"
    },
    {
      "number": req.body.concerts,
      "text": "Концертов отыграл"
    },
    {
      "number": req.body.cities,
      "text": "Максимальное число городов в туре"
    },
    {
      "number": req.body.years,
      "text": "Лет на сцене в качестве скрипача"
    }
  ]);
  db.save();
  res.redirect('/?msg=Картинка успешно загружена');
  
};
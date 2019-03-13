const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db');
const validation = require('../libs/validation');
const util = require('util');
const rename = util.promisify(fs.rename);

module.exports.getAdmin = async (ctx, next) => {
  ctx.render('pages/admin', { title: 'Login', /*authorized: ctx.session.isAuth */});
};

module.exports.uploadData = async (ctx, next) => {
  const { productName, price } = ctx.request.body;
  const { name, path: filePath } = ctx.request.files.photo;
  const responseErr = validation.uploadValidation(productName, price, name);
  if (responseErr) {
    await unlink(filePath);
    ctx.body = responseErr;
  }

  let fileName = path.join(process.cwd(), './public/assets/img/', 'upload', name);
  let writeName = path.join('./assets/img/', 'upload', name);
  const errUpload = await rename(filePath, fileName);
  if (errUpload) {
    retrun(
      (ctx.body = {
        mes: 'При загрузке картинки что-то пошло не так...',
        status: 'Error',
      })
    );
  }

  db.get('productData')
    .push({
      //src: path.join('upload', name),
      src: writeName,
      name: productName,
      price: price
    })
    .write();
    ctx.body = {
    mes: 'Picture success upload!',
    status: 'OK',
  }; 
  ctx.redirect('/')
}
    
module.exports.postSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;
  const responseErr = validation.skillsValidation(age, concerts, cities, years);
  if (responseErr) {
    ctx.body = responseErr;
  }
  db.set('skillsData', [
    {
      "number": age,
      "text": "Возраст начала занятий на скрипке"
    },
    {
      "number": concerts,
      "text": "Концертов отыграл"
    },
    {
      "number": cities,
      "text": "Максимальное число городов в туре"
    },
    {
      "number": years,
      "text": "Лет на сцене в качестве скрипача"
    }
  ])
  .write();
  ctx.body = {
    mes: 'Данные успешно обновлены',
    status: 'OK'
  }
  //db.save();
    ctx.redirect('/');
  
};
const nodemailer = require('nodemailer');
const config = require('../config.json');
const db = require('../models/db')();


module.exports.getIndex = (req, res, next) => {
  res.render('pages/index', { 
    title: 'Main',
    msg: req.query.msg,
    products: db.stores.file.store.productData,
    skills: db.stores.file.store.skillsData
  });
};



module.exports.sendMessage = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    //output the alert message
    return res.redirect('/?msg=All fields should be filled!');
  }
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    // если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.json({
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error'
      });
    }
    res.json({ msg: 'Письмо успешно отправлено!', status: 'Ok' });
  });
  db.set('messageData', {
    'name': req.body.name,
    'email': req.body.email,
    'message': req.body.message
  });     
  db.save();
  res.redirect('/?msg=Сообщение успешно отправлено');

};
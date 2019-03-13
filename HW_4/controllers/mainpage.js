const nodemailer = require('nodemailer');
const config = require('../config');
const db = require('../models/db');
const validation = require('../libs/validation');

module.exports.getIndex = async (ctx, next) => {
  const products = db.getState().productData || [];
  const skills = db.getState().skillsData || [];
  ctx.render('pages/index', { 
    title: 'Main',
    //msg: msg,
    products: products,
    skills: skills
  });
};


module.exports.sendMessage = async (ctx, next) => {
  const { name, email, message } = ctx.request.body;
  const responseErr = validation.messageValidation(name, email, message);
  if (responseErr) {
    ctx.body = responseErr;
  }
  
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      message.trim().slice(0, 500) +
      `\n Отправлено с: <${email}>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    // если есть ошибки при отправке - сообщаем об этом
    if (error) {
      retrun(
        (ctx.body = {
          mes: 'При отправке сообщения что-то пошло не так...',
          status: 'Error',
        })
      );
    }   
  });
  db.set('messageData', {
    'name': name,
    'email': email,
    'message': message
  })
  .write();
  /*ctx.body = {
    mes: 'Сообщение успешно отправлено',
    status: 'OK'
  }*/
  ctx.redirect('back');
  ctx.body = {
    mes: 'Сообщение успешно отправлено',
    status: 'OK'
  }
};
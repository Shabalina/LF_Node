const db = require('../models/db');
const psw = require('../libs/password');

module.exports.getAuth = async (ctx, next) => {
  ctx.render('pages/login', { title: 'Login' });
};

module.exports.sendLogin = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = db.get('user').value();
  if (user.email === email && psw.validPassword(password)) {
    ctx.session.isAuth = true;
    ctx.body = {
      mes: 'Done',
      status: 'OK',
    };
    ctx.redirect('/admin');
  } else {    
      ctx.redirect('/login');
      ctx.body = {
        mes: 'Forbiden',
        status: 'Error',
      };
  }
};
  

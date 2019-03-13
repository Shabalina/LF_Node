const db = require('../models/db')();

module.exports.getAuth = (req, res, next) => {
  res.render('pages/login', { title: 'Login' });
};
  
module.exports.sendLogin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    //output the alert message
    return res.redirect('/login?msg=All fields should be filled!');
  }

  db.set('authData', {
    'email':req.body.email,
    'password': req.body.password
  });      
  db.save();
  req.session.isAdmin = true;
  res.redirect('/admin?msg=Вы зашли в панель администратора');

};
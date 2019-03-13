var express = require('express');
var router = express.Router();

const contrlMain = require('../controllers/mainpage');
const contrlAuth = require('../controllers/authpage');
const contrlAdmin = require('../controllers/adminpage');

const isAdmin = (req, res, next) => {
    
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/');
};

router.get('/', contrlMain.getIndex);
router.post('/', contrlMain.sendMessage);

router.get('/login', contrlAuth.getAuth);
router.post('/login', contrlAuth.sendLogin);

router.get('/admin', isAdmin, contrlAdmin.getAdmin);
router.post('/admin/upload', contrlAdmin.uploadData);
router.post('/admin/skills', contrlAdmin.postSkills);


module.exports = router;
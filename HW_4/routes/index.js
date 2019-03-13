const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const contrlMain = require('../controllers/mainpage');
const contrlAuth = require('../controllers/authpage');
const contrlAdmin = require('../controllers/adminpage');

const isAdmin = async (ctx, next) => {
  if (ctx.session.isAuth){
    return next();
  }
  ctx.redirect('/')
};
/*const isAdmin = (req, res, next) => {
    
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/');
};*/

router.get('/', contrlMain.getIndex);
router.post('/', koaBody(), contrlMain.sendMessage);

router.get('/login', contrlAuth.getAuth);
router.post('/login', koaBody(), contrlAuth.sendLogin);

router.get('/admin', isAdmin, contrlAdmin.getAdmin);
router.post('/admin/skills', koaBody(), contrlAdmin.postSkills);
router.post('/admin/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: process.cwd() + '/public/assets/img/upload',
  },
}),
contrlAdmin.uploadData);

module.exports = router;
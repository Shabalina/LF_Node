var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const session = require('express-session')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'nodecourse',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  // render the error page
  res.status(err.status || 500);
  res.render('error',{message: err.message, error: err});
});

const server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server run on port: ' + server.address().port);
});

//module.exports = app;

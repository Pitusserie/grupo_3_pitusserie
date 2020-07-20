const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const methodOverride =  require('method-override');
const session= require('express-session')
const cookieParser= require('cookie-parser')
const {check, validationResult, body} = require('express-validator');
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({secret: 'funcionando'}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"))

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {

  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  // Puse redirect porque si ponia render habian algunos problemas cargando el css y el js
  res.redirect('/error');
});
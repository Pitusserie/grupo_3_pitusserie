const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const indexRouter = require('./routes/index');

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use('/', indexRouter)

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
function adminMiddleware(req, res, next) {
    if(req.session.usuario && req.session.usuario.administrador == true) {
        next();
    }   else {
        return res.redirect('/');
    }
}

module.exports = adminMiddleware;
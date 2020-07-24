function authMiddleware(req, res, next) {
    if(req.session.usuario && req.session.usuario.id == 1) {
        next();
    }   else {
        return res.redirect('/');
    }
}

module.exports = authMiddleware;
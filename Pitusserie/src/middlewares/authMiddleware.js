function authMiddleware(req, res, next) {
    if(req.session.usuario == undefined) {
        return res.redirect('/login')
    }   else {
    next();
    }
}

module.exports = authMiddleware;
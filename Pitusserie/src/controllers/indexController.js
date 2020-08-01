module.exports = {
    index: function(req, res) {
        res.render('index', {
            session: req.session.usuario
        });
    },
    error: function(req, res) {
        res.render('error')
    }
}
const db = require('../database/models/index.js');

module.exports = {
    index: function(req, res) {
        db.Product.findAll({
            where: {
                [db.Sequelize.Op.or]: [{categorie_id:1}, {categorie_id:2}]
            }
        })
        // .then(function(productos) {
        //     res.send(productos);
        // })
        .then(function(productos) {
            res.render('index', {
                session: req.session.usuario,
                productos: productos
            });
        })
    },
    error: function(req, res) {
        res.render('error')
    }
}
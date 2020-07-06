const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    index: function(req, res) {
        res.render('index', {
            productos: productos
        });
    },
    products: function(req, res) {
        res.render('products', {
            productos:productos,
            id:req.params.id
        });
    },
    detail: function(req, res) {
        res.render('detailProducts',{
            productos:productos,
            id:req.params.id
        });
    },
    cart: function(req, res) {
        res.render('cart', {
            productos:productos,
            id:req.params.id
        });
    },
    carga: function(req, res) {
        res.render('cargaProducts');
    },
    store: (req, res) => {
		let nuevoProducto = {
			id: productos[productos.length - 1].id + 1,
            categorias: req.body.categorias,
            titulo: req.body.titulo,
            miniDesc: req.body.descripcion,
            precio: req.body.precio,
            img: req.files[0].filename,
            porciones: req.body.porciones
        };
		productos.push(nuevoProducto);
		let listaActualizada = JSON.stringify(productos);
		fs.writeFileSync(productsFilePath, listaActualizada);
        res.redirect('/products');
    },
    edit: (req, res) => {
		for(let i = 0; i < productos.length; i++) {
			if(productos[i].id == req.params.id) {
				res.render('edit', {
					producto: productos[i]
				})
			}
		}
    },
    update: function(req, res) {
		let productoActualizado = {
			id: Number(req.params.id),
			categorias: req.body.categorias,
            titulo: req.body.titulo,
            miniDesc: req.body.descripcion,
            precio: req.body.precio,
            img: productos[req.params.id-1].img,
            porciones: req.body.porciones
		}
		for(let i = 0; i < productos.length; i++) {
			if(productos[i].id == productoActualizado.id) {
				productos[i] = productoActualizado;
				fs.writeFileSync(productsFilePath, JSON.stringify(productos));
				res.redirect('/products')
			}
		}
    },
    destroy : (req, res) => {
		for(let i = 0; i < productos.length; i++) {
			if(productos[i].id == req.params.id) {
				let index = productos.indexOf(productos[i]);
				productos.splice(index, 1);
				fs.writeFileSync(productsFilePath, JSON.stringify(productos));
				res.redirect('/products')
			}
		}
	}
}
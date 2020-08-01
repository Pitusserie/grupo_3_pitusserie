module.exports = function(sequelize, dataTypes) {
    let alias = "Producto";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        categorias: {
            type: dataTypes.CHAR(50),
            allowNull: false,
        },
        descripcion: {
            type: dataTypes.CHAR(100),
            allowNull: false,
        },
        precio: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        img: {
            type: dataTypes.CHAR(50),
            allowNull: false,
        },
        porciones: {
            type: dataTypes.SMALLINT(10),
            allowNull: false,
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config);

    return Producto;
}
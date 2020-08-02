module.exports = function(sequelize, dataTypes) {
    let alias = "Usuario";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        telefono: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        contrasena: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        administrador: {
            type: dataTypes.BOOLEAN
        }
    }

    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}
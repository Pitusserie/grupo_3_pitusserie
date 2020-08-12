module.exports = function(sequelize, dataTypes) {
    let alias = "Product_User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_products: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        id_users: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }

    let config = {
        tableName: "Product_User",
        timestamps: false
    }

    let Product_User = sequelize.define(alias, cols, config);

    return Product_User;
}
module.exports = function(sequelize, dataTypes) {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        categorie_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        slices: {
            type: dataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Categorie, {
            as: 'categorie',
            foreignKey: 'categorie_id'
        });
        Product.belongsToMany(models.User, {
            as: 'user',
            through: 'product_user',
            foreignKey: 'id_products',
            otherKey: 'id_users',
            timestamps: false
        });
    }

    return Product;
}
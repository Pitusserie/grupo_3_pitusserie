module.exports = function(sequelize, dataTypes) {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            unique:true,
        },
        phone: {
            type: dataTypes.INTEGER(11),
            allowNull: false,

        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: dataTypes.BOOLEAN
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsToMany(models.Product, {
            as: 'product',
            through: 'product_user',
            foreignKey: 'id_users',
            otherKey: 'id_products',
            timestamps: false
        });
    }

    return User;
}
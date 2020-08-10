module.exports = function(sequelize, dataTypes) {
    let alias = "SubCategorie";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sub_categorie: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        categorie_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }

    let config = {
        tableName: "subcategories",
        timestamps: false
    }

    let SubCategorie = sequelize.define(alias, cols, config);

    return SubCategorie;
}
module.exports = function(sequelize, dataTypes) {
    let alias = "Categorie";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        categorie: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    let Categorie = sequelize.define(alias, cols, config);

    return Categorie;
}
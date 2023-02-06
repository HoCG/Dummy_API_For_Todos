const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Todo',
      tableName: 'todos',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })};
};
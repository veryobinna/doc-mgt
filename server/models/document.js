'use strict';
module.exports = function(sequelize, DataTypes) {
  var Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Documents.belongsTo(models.Users,{
          foreignKey: 'ownerID',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Documents;
};
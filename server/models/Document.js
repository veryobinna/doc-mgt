export default(sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        },
        is: {
          args: /^[a-zA-Z0-9_\s]*$/,
          msg: 'No special characters'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Content cannot be empty'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Access cannot be empty'
        },
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'Access can either be public ,private or role'
        }
      }
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
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerID',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Documents;
};

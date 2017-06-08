import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.hasMany(models.Documents, {
          foreignKey: 'ownerID',
        });
        Users.belongsTo(models.Roles, {
          foreignKey: 'roleID',
        });
      }
    },
    instanceMethods: {
      hashPassword() {
        return bcrypt.hashSync(this.password);
      },
      isVerified(submmitedPassword) {
        return bcrypt.compareSync(submmitedPassword, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, 7);
      },
    }
  });
  return Users;
};

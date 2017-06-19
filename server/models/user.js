import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'FirstName cannot be empty'
        },
        is: {
          args: /^[a-zA-Z]*$/,
          msg: 'Alphabets only'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'LastName cannot be empty'
        },
        is: {
          args: /^[a-zA-Z]*$/,
          msg: 'Alphbets only'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Userame cannot be empty'
        },
        is: {
          args: /^[a-zA-Z0-9_]*$/,
          msg: 'No special characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: true,

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
      }
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
        this.password = bcrypt.hashSync(this.password, 7);
        return this.password;
      },
      isVerified(submmitedPassword) {
        return bcrypt.compareSync(submmitedPassword, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate(user) {
        user.hashPassword();
      }
    }
  });
  return Users;
};


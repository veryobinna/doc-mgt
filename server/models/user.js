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
      unique: {
        args: true,
        msg: 'Username already exists'
      },
      validate: {
        min: {
          args: 3,
          msg: 'Username must start with a letter, have no spaces, and be at least 3 characters.'
        },
        max: {
          args: 40,
          msg: 'Username must start with a letter, have no spaces, and be at less than 40 characters.'
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9-]+$/i, // must start with letter and only have letters, numbers, dashes
          msg: 'Username must start with a letter, have no spaces, and be 3 - 40 characters.'
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email'
        },

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


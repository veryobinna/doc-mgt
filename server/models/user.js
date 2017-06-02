import bcrypt from 'bcrypt'
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Documents, {
          foreignKey: 'ownerID',
        });
        Users.belongsTo(models.Roles,{
          foreignKey: 'roleID',
        });
      }
    },
    instanceMethods: {
      hashPassword(){
        console.log("inside instancesfdfdfdfdfdf")
        return bcrypt.hashSync(this.password)
      }
    },
  hooks: {
    beforeCreate (user) {
      console.log(user.password)
      user.password = bcrypt.hashSync(user.password,7)
    },
  }
  });
  return Users;
};
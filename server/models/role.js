export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        Roles.hasMany(models.Users, {
          foreignKey: 'roleID',

        });
      }
    }
  });
  return Roles;
};
const User = require('../models').Users;

module.exports = {
  create(req, res) {
    console.log(req.body);
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roleID: req.body.roleID,

      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return User
    .all()
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
},
};
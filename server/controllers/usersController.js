import models from '../models/';
import bcrypt from 'bcrypt'


const User =  models.Users;
const Document =  models.Documents;

export default {
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
    .findAll({
      include: [{
        model: Document,
      }],
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}, search(req, res){
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found, please check the ID and try again'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res){
    return User
      .findById(req.params.id)

    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found, please try again',
        });
      }
      return user
        .update(req.body, { fields: Object.keys(req.body) })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},

/**
 * 
 * 
 * @param {any} req 
 * @param {any} res 
 * @returns 
 */
destroy(req, res) {
  return User
    .findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},

};
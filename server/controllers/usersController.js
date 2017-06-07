import models from '../models/';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const User = models.Users;
const Document = models.Documents;
const secret = 'sinzu';

export default {
  create(req, res) {
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
  login(req, res) {
    if (req.body.loginId === '' || req.body.password === '') {
      return res.status(400).json({
        message: 'Please input a Username or email',
      });
    }
    return User
      .findOne({
        where: {
          $or: [{
            username: req.body.loginID
          }, {
            email: req.body.loginID
          }]
        }

      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        } else if (user.isVerified(req.body.password)) {
          console.log('we got to the login')
          const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            roleID: user.roleID
          }
          const token = jwt.sign(userData, secret, { expiresIn: '1hr' });
          res.status(200).json({
            userData,
            message: 'User logged in successfully',
            token
          });
        } else {
          res.status(400).json({
            message: 'Login failed. Check your username/email or password'
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  logout(req, res) {
    res.status(200).json({
      message: 'User logged out'
    });
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
  },
  find(req, res) {
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
  search(req, res) {
    return User
      .findAll({
        where: {
          $or: [
            { firstName: { $ilike: `%${req.query.q}%` } },
            { lastName: { $ilike: `%${req.query.q}%` } }
          ]
        }
      })
      .then( users => {
        console.log('the password is ',users[0].password), res.status(200).send({ users })})
      .catch(error => res.status(401).send({ error }));
  },
  update(req, res) {
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
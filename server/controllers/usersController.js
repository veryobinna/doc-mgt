import jwt from 'jsonwebtoken';
import models from '../models/';


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
        roleID: 1,

      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).json({
        message: error
      }));
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
          const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            roleID: user.roleID
          };
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
      .catch(error => res.status(400).json({
        message: error
      }));
  },
  logout(req, res) {
    res.status(200).json({
      message: 'User logged out'
    });
  },
  list(req, res) {
    return User
      .findAndCountAll({
        limit: Number.parseInt(req.query.limit, 10) || null,
        offset: Number.parseInt(req.query.offset, 10) || null
        // include: [{
        //   model: Document,
        // }],
      })
      .then(users => res.status(200).send({
        users: users.rows,
        count: users.count
      }))
      .catch(error => res.status(400).json({
        message: error
      }));
  },
  find(req, res) {
    return User
      .findById(Number.parseInt(req.params.id, 10))
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found, please check the ID and try again'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },
  search(req, res) {
    return User
      .findAndCountAll({
        limit: Number.parseInt(req.query.limit, 10) || null,
        offset: Number.parseInt(req.query.offset, 10) || null,
        where: {
          $or: [
            { firstName: { $ilike: `%${req.query.q}%` } },
            { lastName: { $ilike: `%${req.query.q}%` } }
          ]
        }
      })
      .then((users) => {
        res.status(200).send({
          users: users.rows,
          count: users.count
        });
      })
      .catch(error => res.status(401).json({
        message: error
      }));
  },
  update(req, res) {
    if (req.params.id !== req.decoded.id && req.decoded.roleID === 3) {
      return User
        .findById(Number.parseInt(req.params.id, 10)).then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'Usre not found, check the ID and try again',
            });
          }
          user.update(req.body, { fields: Object.keys(req.body) })
            .then(userUpadate => res.status(200).send(userUpadate))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).json({
          message: error
        }));
    } else {
      res.status(404).json({
        message: 'No access to edit user'
      })
    }
  },

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  destroy(req, res) {
    if (req.params.id != req.decoded.id && req.decoded.roleID == 3) {
      return User
        .findById(Number.parseInt(req.params.id, 10))
        .then((user) => {
          if (!user) {
            return res.status(400).send({
              message: 'User Not Found',
            });
          }
          return user
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({
              message: error
            }));
        })
        .catch(error => res.status(400).json({
          message: error
        }));
    } else {
      res.status(404).json({
        message: 'No access to delete user'
      })
    }
  },

};

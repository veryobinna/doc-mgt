import jwt from 'jsonwebtoken';
import models from '../models/';
import pagination from '../helpers/pagination';

require('dotenv').config();


const User = models.Users;
const Role = models.Roles;

const secret = process.env.SECRET;

export default {
  /**
   * creates a user
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  create(req, res) {
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roleID: 3,

      })
      .then((user) => {
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          roleID: user.roleID,
        };
        const token = jwt.sign(userData, secret, { expiresIn: '12hr' });

        res.status(201).send({
          token,
          message: 'User Created',
        });
      })
      .catch(error => res.status(400).json({
        message: error.errors[0].message
      }));
  },

  /**
   * logs in a user
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  login(req, res) {
    if (req.body.loginId === '' || req.body.password === '') {
      return res.status(400).json({
        message: 'Please input a username or email and pasword',
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
        },
        include: {
          model: Role,
          attributes: ['name']
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
            roleID: user.roleID,
            roleName: user.Role.name
          };
          const token = jwt.sign(userData, secret, { expiresIn: '12hr' });
          res.status(200).json({
            message: 'Login Successful',
            token
          });
        } else {
          res.status(400).json({
            message: 'Login failed! Check your loginID or password'
          });
        }
      })
      .catch(error => res.status(500).json({
        error,
        message: 'server error'
      }));
  },

  /**
   * lists all users
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  list(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12;
    return User
      .findAndCountAll({
        limit,
        offset,
        include: {
          model: Role,
          attributes: ['name']
        },
        order: [['id', 'DESC']]
      })
      .then((users) => {
        const userData = users.rows.map(user => Object.assign({},
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            roleID: user.roleID,
            Role: user.Role
          }));
        const paginate = pagination(users, offset, limit);
        res.status(200).send({
          users: userData,
          paginate
        });
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },

  /**
   * fetches a user
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  find(req, res) {
    return User
      .findById(Number.parseInt(req.params.id, 10))
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },

  /**
   * shows a user that matches the search query
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  search(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 10;
    return User
      .findAndCountAll({
        limit,
        offset,
        where: {
          $or: [
            { firstName: { $ilike: `%${req.query.q}%` } },
            { lastName: { $ilike: `%${req.query.q}%` } }
          ]
        },
        include: {
          model: Role,
          attributes: ['name']
        }
      })
      .then((users) => {
        const paginate = pagination(users, offset, limit);
        res.status(200).send({
          users: users.rows,
          paginate
        });
      })
      .catch(error => res.status(401).json({
        message: error
      }));
  },

  /**
   * updates a user
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  update(req, res) {
    if (Number.parseInt(req.params.id, 10) !==
    Number.parseInt(req.decoded.id, 10) && req.decoded.roleID === 1) {
      return User
        .findById(Number.parseInt(req.params.id, 10)).then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'User not found',
            });
          }
          user.update(req.body, { fields: Object.keys(req.body) })
            .then(userUpadate => res.status(200).send(userUpadate))
      .catch(error => res.status(400).json({
        message: error.errors[0].message
      }));
        })
        .catch(error => res.status(400).json({
          message: error
        }));
    }
    res.status(404).json({
      message: 'No access to edit user'
    });
  },

  /**
   * deletes a user
   * @param {any} req
   * @param {any} res
   * @returns {object} User object
   */
  destroy(req, res) {
    if (Number.parseInt(req.params.id, 10) !==
    Number.parseInt(req.decoded.id, 10) && req.decoded.roleID === 1) {
      return User
        .findById(Number.parseInt(req.params.id, 10))
        .then((user) => {
          if (!user) {
            return res.status(404).send({
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
    }
    res.status(403).json({
      message: 'Cannot Delete User'
    });
  },
  logout(req, res) {
    const id = req.decoded.id;
    User.findById(id)
      .then(() => {
        res.status(200).json({ message: 'logout successful' });
      })
          .catch((error) => {
            res.status(400).json({
              message: error
            });
          });
  }
};

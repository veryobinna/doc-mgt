import jwt from 'jsonwebtoken';
import models from '../models/';

require('dotenv').config();


const User = models.Users;
const Role = models.Roles;

const secret = process.env.SECRET;

export default {
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
        const data = users.rows.map(user => Object.assign({},
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            roleID: user.roleID,
            Role: user.Role
          }));
        const paginate = {
          page: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length,
          totalCount: users.count,
          pageCount: Math.ceil(users.count / limit)

        };
        res.status(200).send({
          users: data,
          paginate
        });
      })
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
            message: 'User not found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },
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
        const paginate = {
          page: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length,
          totalCount: users.count,
          pageCount: Math.ceil(users.count / limit)

        };
        res.status(200).send({
          users: users.rows,
          paginate
        });
      })
      .catch(error => res.status(401).json({
        message: error
      }));
  },
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

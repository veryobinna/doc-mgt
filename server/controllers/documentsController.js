import models from '../models/';

const Document = models.Documents;
const User = models.Users;


export default {
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        ownerID: req.decoded.id,
        roleID: req.decoded.roleID,
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).json({
        message: error
      }));
  },
  list(req, res) {
    return Document
      .findAll({
        where: {
          $or: [
            {
              ownerID: `${req.decoded.id}`
            },
            {
              access: 'public'
            },
            {
              access: 'role',
              roleID: {
                $lte: `${req.decoded.roleID}`
              }
            }
          ]
        }
      })
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).json({
        message: error
      }));
  },
  listUsersDocuments(req, res) {
    return User.findById(Number.parseInt(req.params.id, 10))
      .then((user) => {
        if (user) {
          Document
            .findAll({
              where: {
                ownerID: `${Number.parseInt(req.params.id, 10)}`
              }
            })
            .then(document => res.status(200).send(document))
            .catch(error => res.status(400).send(error));
        } else {
          res.status(404)
            .json({
              message: 'UserNotFoundError'
            });
        }
      });
  },
  find(req, res) {
    return Document

      .findById(Number.parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found, please check the ID and try again'
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },

  search(req, res) {
    return Document
      .findAndCountAll({
        limit: Number.parseInt(req.query.limit, 10) || null,
        offset: Number.parseInt(req.query.offset, 10) || null,
        where: {
          $and: {
            title: { $ilike: `%${req.query.q}%` },
            $or: [
              {
                ownerID: `${req.decoded.id}`
              },
              {
                access: 'public'
              },
              {
                access: 'role',
                roleID: {
                  $lte: `${req.decoded.roleID}`
                }
              }
            ]

          }
        }
      })
      .then(document => res.status(200).send({
        document: document.rows,
        count: document.count
      }))
      .catch(error => res.status(401).json({
        message: error
      }));
  },
  update(req, res) {
    return Document
      .findById(Number.parseInt(req.params.id, 10))

      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found, please try again',
          });
        }
        return document
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(document))
          .catch(error => res.status(400).json({
            message: error
          }));
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },
  destroy(req, res) {
    return Document
      .findById(Number.parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(400).send({
            message: 'Document Not Found',
          });
        }
        return document
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).json({
            message: error
          }));
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },
};

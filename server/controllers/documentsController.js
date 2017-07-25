import models from '../models/';

const Document = models.Documents;
const User = models.Users;


export default {
  create(req, res) {
    Document.findOne({ where: {
      $and: {
        ownerID: req.decoded.id,
        title: req.body.title } } })
      .then((documentExist) => {
        if (documentExist) {
          res.status(400).json(
            { message: 'Title already exist' });
        } else {
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
        message: error.errors[0].message
      }));
        }
      });
  },

  list(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12;
    if (req.decoded.roleID === 1) {
      return Document
        .findAndCountAll({
          limit,
          offset,
          include: {
            model: User,
            attributes: ['firstName', 'lastName']
          },
          order: [['updatedAt', 'DESC']]
        })
        .then((document) => {
          const paginate = {
            page: Math.floor(offset / limit) + 1,
            pageSize: document.rows.length,
            totalCount: document.count,
            pageCount: Math.ceil(document.count / limit)

          };
          res.status(200).send({
            document: document.rows,
            paginate
          });
        })
        .catch(error => res.status(400).json({
          error: error.message,
          message: 'Invalid user input'
        }));
    }
    return Document
      .findAndCountAll({
        limit,
        offset,
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
                $gte: `${req.decoded.roleID}`
              }
            }
          ]
        },
        include: {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']]
      })
      .then((document) => {
        const paginate = {
          page: Math.floor(offset / limit) + 1,
          pageSize: document.rows.length,
          totalCount: document.count,
          pageCount: Math.ceil(document.count / limit)

        };
        res.status(200).send({
          document: document.rows,
          paginate
        });
      })
      .catch(error => res.status(400).json({
        error: error.message,
        message: 'Invalid user input'
      }));
  },

  listUsersDocuments(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12;
    return User.findById(Number.parseInt(req.params.id, 10))
      .then((user) => {
        if (user) {
          Document
            .findAndCountAll({
              limit,
              offset,
              where: {
                ownerID: `${Number.parseInt(req.params.id, 10)}`
              },
              include: {
                model: User,
                attributes: ['firstName', 'lastName']
              },
              order: [['updatedAt', 'DESC']]
            })
            .then((document) => {
              const paginate = {
                page: Math.floor(offset / limit) + 1,
                pageSize: document.rows.length,
                totalCount: document.count,
                pageCount: Math.ceil(document.count / limit)

              };
              res.status(200).send({
                document: document.rows,
                paginate
              });
            });
        } else {
          res.status(404)
            .json({
              message: 'User Not Found'
            });
        }
      }).catch(error => res.status(400).json({
        error: error.message,
        message: 'Invalid User Input'
      }));
  },

  find(req, res) {
    if (req.decoded.roleID === 1) {
      return Document
        .findOne({
          where: {
            id: Number.parseInt(req.params.id, 10)
          },
          include: {
            model: User,
            attributes: ['firstName', 'lastName']
          },
          order: [['updatedAt', 'DESC']]
        }).then((document) => {
          if (!document) {
            return res.status(404).send({
              message: 'Document not found'
            });
          }
          return res.status(200).send(document);
        })
        .catch(error => res.status(400).json({
          message: ' Document Not Found',
          error: error.message
        }));
    }
    return Document
      .findOne({
        where: {
          $and: {
            id: Number.parseInt(req.params.id, 10),
            $or: [
              {
                ownerID: `${req.decoded.id}`
              },
              {
                access: 'public'
              },
              {
                access: 'role',
                roleID: `${req.decoded.roleID}`
              }
            ]

          }
        },
        include: {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']]
      })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found'
          });
        }
        return res.status(200).send(document);
      })
        .catch(error => res.status(400).json({
          message: ' Document Not Found',
          error: error.message
        }));
  },

  search(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12;
    if (req.decoded.roleID === 1) {
      return Document
        .findAndCountAll({
          limit,
          offset,
          where: {
            title: { $ilike: `%${req.query.q}%` }
          },
          include: {
            model: User,
            attributes: ['firstName', 'lastName']
          },
          order: [['updatedAt', 'DESC']]
        })
        .then((document) => {
          const paginate = {
            page: Math.floor(offset / limit) + 1,
            pageSize: document.rows.length,
            totalCount: document.count,
            pageCount: Math.ceil(document.count / limit)

          };
          res.status(200).send({
            document: document.rows,
            paginate
          });
        })
        .catch(error => res.status(401).json({
          message: error.message
        }));
    }
    return Document
      .findAndCountAll({
        limit,
        offset,
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
                roleID: `${req.decoded.roleID}`
              }
            ]

          }
        },
        include: {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']]
      })
      .then((document) => {
        const paginate = {
          page: Math.floor(offset / limit) + 1,
          pageSize: document.rows.length,
          totalCount: document.count,
          pageCount: Math.ceil(document.count / limit)

        };
        res.status(200).send({
          document: document.rows,
          paginate
        });
      })
      .catch(error => res.status(401).json({
        message: error.message
      }));
  },

  update(req, res) {
    Document.findOne({ where: {
      $and: {
        ownerID: req.decoded.id,
        title: req.body.title } } })
      .then((documentExist) => {
        if (documentExist && +(req.params.id) !== documentExist.id) {
          res.status(400).json(
            { message: 'Title already exist' });
        } else {
          return Document
      .findById(Number.parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        } else if ((document.ownerID === req.decoded.id)
                  || (req.decoded.roleID === 1)) {
          return document
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send({
            document,
            message: 'Document Updated Successfully'
          }))
          .catch(error => res.status(400).json({
            message: error.message
          }));
        }
        return res.status(401).send({
          message: 'Access Denied',
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
        }
      });
  },

  destroy(req, res) {
    if (req.decoded.roleID === 1) {
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
            .then(() => res.status(204).send({
              message: 'Document Deleted Successfully'
            }))
            .catch(error => res.status(400).json({
              message: error.message
            }));
        })
        .catch(error => res.status(400).json({
          message: error.message
        }));
    }

    return Document
      .findById(Number.parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        } else if (document.ownerID !== req.decoded.id) {
          return res.status(401).send({
            message: 'Access Denied',
          });
        }
        return document
          .destroy()
          .then(() => res.status(204).send({
            message: 'Document Deleted Successfully'
          }))
          .catch(error => res.status(400).json({
            message: error.message
          }));
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  },
};

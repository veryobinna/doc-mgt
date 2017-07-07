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
          message: error
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
              roleID: 1
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
        message: error
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
            })
            .catch(error => res.status(400).send(error));
        } else {
          res.status(404)
            .json({
              message: 'User Not Found'
            });
        }
      });
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
          message: error
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
        message: error
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
          message: error
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
        message: error
      }));
  },

  update(req, res) {
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
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send({
            document,
            message: 'Document Updated Successfully'
          }))
          .catch(error => res.status(400).json({
            message: error
          }));
      })
      .catch(error => res.status(400).json({
        message: error
      }));
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
              message: error
            }));
        })
        .catch(error => res.status(400).json({
          message: error
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
            message: error
          }));
      })
      .catch(error => res.status(400).json({
        message: error
      }));
  },
};

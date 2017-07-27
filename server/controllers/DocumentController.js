import models from '../models/';
import pagination from '../helpers/pagination';

const Document = models.Documents;
const User = models.Users;
let accessPrivate = 'public';


export default {
  /**
   * creates a document
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
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

  /**
   * lists all document available to a user
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
  list(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12;
    if (req.decoded.roleID === 1) {
      accessPrivate = 'private';
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
              access: 'public',
            },
            {
              access: accessPrivate
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
        const paginate = pagination(document, offset, limit);
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

  /**
   * list all user's documents
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
  listUsersDocuments(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12,
      ownerID = Number.parseInt(req.params.id, 10);
    if (ownerID === req.decoded.id || req.decoded.roleID === 1) {
      return User.findById(ownerID)
      .then((user) => {
        if (user) {
          Document
            .findAndCountAll({
              limit,
              offset,
              where: {
                ownerID
              },
              include: {
                model: User,
                attributes: ['firstName', 'lastName']
              },
              order: [['updatedAt', 'DESC']]
            })
            .then((document) => {
              const paginate = pagination(document, offset, limit);
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
    }
    return res.status(401).send({
      message: 'Access Denied',
    });
  },

  /**
   * fetches a document
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
  find(req, res) {
    accessPrivate = 'public';
    if (req.decoded.roleID === 1) {
      accessPrivate = 'private';
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
                access: accessPrivate
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

  /**
   * shows all documents matching the serch query
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
  search(req, res) {
    const offset = Number.parseInt(req.query.offset, 10) || 0,
      limit = Number.parseInt(req.query.limit, 10) || 12;
    if (req.decoded.roleID === 1) {
      accessPrivate = 'private';
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
                access: accessPrivate
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
        const paginate = pagination(document, offset, limit);
        res.status(200).send({
          document: document.rows,
          paginate
        });
      })
      .catch(error => res.status(401).json({
        message: error.message
      }));
  },

  /**
   * updates a document
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
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

  /**
   * deletes a document
   * @param {any} req
   * @param {any} res
   * @returns {object} Document object
   */
  destroy(req, res) {
    return Document
      .findById(Number.parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        } else if (document.ownerID === req.decoded.id ||
        req.decoded.roleID === 1) {
          return document
          .destroy()
          .then(() => res.status(204).send({
            message: 'Document Deleted Successfully'
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
  },
};

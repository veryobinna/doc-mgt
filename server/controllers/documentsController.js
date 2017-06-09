import models from '../models/';

const Document = models.Documents;

export default {
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        ownerID: req.body.ownerID,
        roleID: req.body.roleID,
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
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
      .catch(error => res.status(400).send(error));
  },
  find(req, res) {
    return Document
      .findById(Number.parseInt(req.params.id, 10))
      .then(document => {
        if (!document) {
          return res.status(404).send({
            message: 'Document not found, please check the ID and try again'
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    console.log('req.decode is ', req.decoded)
    return Document
      .findAll({
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
      .then(document => res.status(200).send({ document }))
      .catch(error => res.status(401).send({ error }));
  },
  update(req, res) {
    return Document
      .findById(Number.parseInt(req.params.id, 10))

      .then(document => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found, please try again',
          });
        }
        return document
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(document))  // Send back the updated document.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Document
      .findById(Number.parseInt(req.params.id, 10))
      .then(document => {
        if (!document) {
          return res.status(400).send({
            message: 'Document Not Found',
          });
        }
        return document
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
import models from '../models/';

const Document =  models.Documents;

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
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return Document
    .all()
    .then(document => res.status(200).send(document))
    .catch(error => res.status(400).send(error));
},
 };
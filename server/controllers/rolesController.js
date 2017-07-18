import models from '../models/';

const Role = models.Roles;
const User = models.Users;

export default {
  create(req, res) {
    return Role
      .create({
        name: req.body.name,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Role
      .findAll()
      .then(role => res.status(200).send(role))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found'
          });
        }
        return res.status(200).send(role);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Role
      .findById(req.params.id)

      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(role))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        } else if (role.id === 1) {
          return res.status(400).send({
            message: 'Cannot Delete Admin Role',
          });
        }
        return role
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

import models from '../models/';

const Role = models.Roles;

export default {
  /**
   * creates a role
   * @param {any} req
   * @param {any} res
   * @returns {object} Role object
   */
  create(req, res) {
    return Role
      .create({
        name: req.body.name,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  },

  /**
   * lists all roles
   * @param {any} req
   * @param {any} res
   * @returns {object} Role object
   */
  list(req, res) {
    return Role
      .findAll()
      .then(role => res.status(200).send(role))
      .catch(error => res.status(400).send(error));
  },

  /**
   * shows roles that match the search query
   * @param {any} req
   * @param {any} res
   * @returns {object} Role object
   */
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

  /**
   * updates a role
   * @param {any} req
   * @param {any} res
   * @returns {object} Role object
   */
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

  /**
   * deletes a role
   * @param {any} req
   * @param {any} res
   * @returns {object} Role object
   */
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

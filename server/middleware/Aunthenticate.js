import jwt from 'jsonwebtoken';

const secret = 'sinzu';

const Authenticate = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.query.token
    || req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(400).send({
            message: 'Authentication failed.'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No Token provided'
      });
    }
  }
};

export default Authenticate;

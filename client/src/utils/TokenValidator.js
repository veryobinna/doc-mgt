import jwt from 'jsonwebtoken';

const token = window.localStorage.getItem('token');

const TokenValidator = () => {
  if (!token) {
    return {
      valid: false,
      user: null
    };
  } else if (token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      if (decoded.exp < Date.now() / 1000) {
        return {
          valid: false,
          user: null,
        };
      }
      return {
        valid: true,
        user: decoded,
      };
    }
    return {
      valid: false,
      user: null
    };
  }
};

export default TokenValidator;


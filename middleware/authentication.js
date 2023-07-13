const jwt = require('jsonwebtoken');


// checking for authenticateToken ///

function authenticateToken(req, res, next) {

   const token = req.cookies.token;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}


// checking for isAdmin ///

function isAdmin(req, res, next) {

    const token = req.cookies.token;

    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err || !user.isAdmin) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

module.exports = {authenticateToken, isAdmin};

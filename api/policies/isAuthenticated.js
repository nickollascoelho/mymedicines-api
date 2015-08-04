/**
 * isAuthenticated
 *
 * @description :: Policy to check if user is authenticated with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.token) {
    var parts = req.headers.token.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is token: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    delete req.query.token;
  } else {
    return res.json(401, {err: 'auth-not-authenticated'});
  }
  var myReturn = token;
  jwToken.verify(token, function (err, token) {
    if (err) return res.json(401, {err: 'auth-invalid-token: ' + myReturn});
    req.token = token;
    next();
  });
};

/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken'),
    tokenSecret = "8OY#T2ptys!(aJs9YW&#}Go&2+t(!0";

module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret,
    {
      expiresInMinutes : 180
    }
  );
};


module.exports.verify = function(token, callback) {
  return jwt.verify(
    token,
    tokenSecret,
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback
  );
};

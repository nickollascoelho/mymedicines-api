/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    var name = req.param('name');
    var password = req.param('password');

    if (!name || !password) {
      return res.json(401, {err: 'Usuário e senha obrigatórios.'});
    }

    User.findOne({name: name}).populate('medicines').exec(function (err, user) {
      if (!user) {
        return res.json(401, {err: 'Usuário ou senha inválido.'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          return res.json(403, {err: 'Forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'Usuário ou senha inválido.'});
        } else {
          res.json({
            user: user,
            token: jwToken.issue({id : user.id })
          });
        }
      });
    });
  }
};

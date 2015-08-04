/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
 var bcrypt = require('bcrypt');

 var insertDemoUser = function() {
   sails.log.info('Inserting demo user');

   var user = { name: 'demo', password: 'demo' };

   return User.create(user);
 };

 var insertMedicines = function() {
   sails.log.info('Inserting demo medicines');

   User.findOne({name: 'demo'}, function (err, demo) {
     if (demo) {
       var medicines = [
         { name: 'Prazol', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user: demo },
         { name: 'Paracetamol', description: 'Nam odio dolor, dapibus vitae congue vitae, maximus non velit. Aliquam in dui tellus. Nunc laoreet justo.', user: demo},
         { name: 'Aspirina', description: 'Lorem ipsum dolor sit amet, dapibus vitae congue consectetur adipiscing elit.', user: demo},
         { name: 'Ritalina', description: 'Nam odio dolor, dapibus vitae congue vitae, maximus non velit.', user: demo }
       ];

       Medicine.create(medicines, function(err, created) {
    
       });
    }
   });
 };

module.exports.bootstrap = function(cb) {

  User.count().then(function(err, count){
    if (count > 0) {
      cb();
    } else {
      insertDemoUser()
      .then(insertMedicines)
      .then(cb);
    }
  });

};

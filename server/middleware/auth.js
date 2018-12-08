const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  models.Sessions.create()
    .then(session => {
      models.Sessions.get({ id: session.insertId })
        .then((sessionRecord) => {
          req.session = JSON.parse(JSON.stringify(sessionRecord));
          res.cookies = { shortlyid: {} };
          res.cookies['shortlyid'].value = req.session.hash;
          next();
        })
        .catch(err => {
          console.log('ERR IN GETTING BY ID AFTER CREATING SESSION: ', err);
          next();
        });
    })
    .catch(err => {
      console.log('ERR IN CREATING SESSION: ', err);
      next();
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.isLoggedIn = (req, res, next) => {
  // models.Sessions.get({ username: req.body.username });
  next();
};
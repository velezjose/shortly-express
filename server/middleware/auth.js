const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.isLoggedIn = (req, res, next) => {
  // models.Sessions.get({ username: req.body.username });
  next();
};
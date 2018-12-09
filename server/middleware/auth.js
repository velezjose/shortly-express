const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.headers.cookie === undefined) {
    req.cookies = {};

    let usrID;
    models.Users.get({ username: req.body.username })
      .then((userRecord) => {
        if (userRecord !== undefined) {
          userRecord = JSON.parse(JSON.stringify(userRecord));
          usrID = userRecord.id;
        } else {
          usrID = null;
        }
      })
      .then(() => models.Sessions.create(usrID))
      .then(session => models.Sessions.get({ id: session.insertId }))
      .then((sessionRecord) => {
        req.session = JSON.parse(JSON.stringify(sessionRecord));
        req.session.user = { username: req.body.username };
        res.cookie('shortlyid', req.session.hash);
        // next();
        // console.l
        models.Users.get({ id: req.session.userId })
          .then(userRecord => {
            console.log(userRecord);
            next();
          });
      })
      // .then(userRecord => {
      //   if (userRecord === undefined) {
      //     req.session.user = { username: 'anonymous user' };
      //   } else {
      // req.session.user = { username: userRecord.username };
      //   }
      //   console.log(';oifajs;eiofasoejfa ---> ', userRecord);
      //   next();
      // })
      .catch(err => {
        console.log('Error in getting username: ', err);
        next();
      });
  } else {
    console.log('ASEOKFOPAEKWFOAFO ------>', req.body.username);
    let hash = req.cookies.shortlyid;
    models.Sessions.get({ hash })
      .then(sessionRecord => {
        console.log('JJ IS COOL ', 'ASDF');
        if (sessionRecord.userId !== null) {
          models.Users.get({ userId: sessionRecord.userId })
            .then(userRecord => {
              req.session = {
                user: { username: userRecord.username },
                userId: userRecord.id
              };
            })
            .catch(err => { throw 'err'; });
        } else {
          req.session = {
            user: { username: 'ANON' },
            userId: null
          };

        }
      })
      .catch(err => { throw 'err'; });


    next();
  }

  // response cookie contains only hash
  // when user queries server later, use the req.headers.cookie.hash to query sessions if its the same person
  // res.cookies = { shortlyid: {} };
  // res.cookies['shortlyid'].value = req.session.hash;
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.isLoggedIn = (req, res, next) => {
  // models.Sessions.get({ username: req.body.username });
  next();
};
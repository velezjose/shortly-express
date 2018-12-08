const Auth = require('./auth');

const parseHelper = (cookie) => {
  let assembled = {};

  // implement trimming whitespace later
  let cookieArr = cookie.split('; ');

  cookieArr.forEach((cookie) => {
    let [key, value] = cookie.split('=');
    assembled[key] = value;
  });

  return assembled;
};

const parseCookies = (req, res, next) => {
  console.log('REQUEST.HEADERS: ', req.headers, '\nREQUEST.HEADERS.COOKIE: ', req.headers.cookie);
  if (req.headers.cookie === undefined) {
    req.cookies = {};
    Auth.createSession(req, res, next);
  } else {
    req.cookies = parseHelper(req.headers.cookie);
    console.log('PARSED COOKIE: ', req.cookies);
    next();
  }
};


module.exports = parseCookies;
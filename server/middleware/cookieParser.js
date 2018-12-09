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
  console.log('this is our cookie ', req.headers.cookie);
  if (req.headers.cookie !== undefined) {
    req.cookies = parseHelper(req.headers.cookie);
  }
  next();
};


module.exports = parseCookies;
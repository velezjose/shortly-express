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
  if (req.headers.Cookie === undefined) {
    req.headers.Cookie = {};
  } else {
    req.headers.Cookie = parseHelper(req.headers.Cookie);
  }
  next();
};


module.exports = parseCookies;
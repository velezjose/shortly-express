const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create links table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS links (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      url VARCHAR(255),
      baseUrl VARCHAR(255),
      code VARCHAR(5),
      title VARCHAR(255),
      visits INT NOT NULL DEFAULT 0
    );`)
    .then(() => {
      // Create clicks table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS clicks (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          linkId INT
        );`); // FOREIGN KEY (linkId) REFERENCES links(id)

    })
    .then(() => {
      // Create users table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(40) UNIQUE,
          password VARCHAR(64),
          salt VARCHAR(64)
        );`);
    })
    .then(() => {
      // Create sessions table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS sessions (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          hash VARCHAR(64),
          userId INT
        )`); // FOREIGN KEY (userId) REFERENCES users(id)
    })
    .error(err => {
      console.log(err);
    });
};

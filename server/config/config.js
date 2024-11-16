module.exports = {
    development: {
      username: 'root',          // Your MySQL username
      password: 'Zafer1998@',      // Your MySQL password
      database: 'project',      // The database you want to connect to
      host: 'localhost',         // Database host
      dialect: 'mysql',          // Database dialect (mysql, postgres, etc.)
    },
    test: {
      username: 'root',
      password: 'password',
      database: 'myapp_test',
      host: 'localhost',
      dialect: 'mysql',
    },
    production: {
      username: 'root',
      password: 'password',
      database: 'myapp_prod',
      host: 'localhost',
      dialect: 'mysql',
    },
  };
  
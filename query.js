const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '10.173.8.115',
  user: 'Admin',
  password: 'Secret@55',
  database: 'users'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM user_data', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();

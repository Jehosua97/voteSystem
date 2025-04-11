const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:9000'
}));

// Middleware to parse JSON bodies
app.use(express.json());

const connection = mysql.createConnection({
  host: '10.173.8.115',
  port: 3306,
  user: 'Admin',
  password: 'Secret@55',
  database: 'user_details'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

app.post('/getUserByCitizenNumber', (req, res) => {
    console.log(req.body); // Log the request body
    const { citizenNumber } = req.body;
    let password =  citizenNumber;
    const query = 'SELECT * FROM user WHERE password = ?';
    if (citizenNumber != 'Admin'){
      password = 'password' + citizenNumber;
    }
    connection.query(query, [password], (error, results) => {
      if (error) {
        res.status(500).send('Error executing query');
        return;
      }
      res.json(results);
    });
  });

  app.post('/updateVoteStatus', async (req, res) => {
    try {
      // Debugging: log the raw body
      console.log('Raw body:', req.body);
      
      // Check if body exists
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
      }
  
      const { citizenNumber, voted } = req.body;
  
      // Validate inputs
      if (citizenNumber === undefined || voted === undefined) {
        return res.status(400).json({ 
          error: 'Both citizenNumber and voted are required',
          received: req.body
        });
      }
  
      // Convert to password format
      const password = citizenNumber === 'Admin' 
        ? 'Admin' 
        : `password${citizenNumber}`;
  
      // SQL query
      const query = 'UPDATE user SET voted = ? WHERE password = ?';
      
      // Execute with promise wrapper
      const [results] = await connection.promise().query(query, [voted, password]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ 
        success: true,
        message: 'Vote status updated',
        citizenNumber,
        newStatus: voted
      });
  
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ 
        error: 'Server error',
        details: error.message 
      });
    }
  });

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE name = ? AND password = ?';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error.stack);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM user';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('exit', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection: ' + err.stack);
    }
    console.log('Connection closed.');
  });
});

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Using regular mysql2 (not promise version)
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:9000',
  /^http:\/\/10\.144\.\d{1,3}\.\d{1,3}(:\d+)?$/,
  /^http:\/\/10\.173\.\d{1,3}\.\d{1,3}(:\d+)?$/
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      }
      return pattern.test(origin);
    });
    
    callback(null, isAllowed);
  },
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection (using createConnection)
const connection = mysql.createConnection({
  host: '10.173.8.115',
  port: 3306,
  user: 'Admin',
  password: 'Secret@55',
  database: 'user_details'
});


connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if can't connect to DB
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  connection.query(
    'SELECT * FROM user WHERE name = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      res.json({ 
        success: results.length > 0,
        user: results[0] || null
      });
    }
  );
});


app.post('/getUserByCitizenNumber', (req, res) => {
  //console.log(req.body); // Log the request body
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
      //console.log('Raw body:', req.body);
      
      // Check if body exists
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
      }
  
      const { citizenNumber, voted, party } = req.body;
  
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
      const query = 'UPDATE user SET voted = ?, party = ? WHERE password = ?';
      
      // Execute with promise wrapper
      const [results] = await connection.promise().query(query, [voted, party, password]);
  
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

  
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM user WHERE name = ? AND password = ?',
      [username, password]
    );

    res.json({ 
      success: rows.length > 0,
      user: rows[0] || null
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

  // Add this new endpoint to your existing code
app.get('/voteStatistics', async (req, res) => {
  try {
    // Query to get total number of voters (who have voted)
    const totalVotersQuery = 'SELECT COUNT(*) as totalVoters FROM user WHERE voted = 1';
    
    // Query to get vote count per party
    const partyStatsQuery = `
      SELECT 
        party, 
        COUNT(*) as voteCount,
        ROUND((COUNT(*) / (SELECT COUNT(*) FROM user WHERE voted = 1)) * 100, 2) as percentage
      FROM user 
      WHERE voted = 1 AND party IS NOT NULL
      GROUP BY party
      ORDER BY voteCount DESC
    `;

    // Execute both queries in parallel
    const [totalResults, partyResults] = await Promise.all([
      connection.promise().query(totalVotersQuery),
      connection.promise().query(partyStatsQuery)
    ]);

    const totalVoters = totalResults[0][0].totalVoters;
    const partyStats = partyResults[0];

    // Ensure all percentages are numbers
    const processedStats = partyStats.map(p => ({
      ...p,
      percentage: Number(p.percentage) || 0  // Convert to number, default to 0 if null/undefined
    }));

    res.json({
      success: true,
      totalVoters,
      parties: processedStats,
      statistics: {
        labels: processedStats.map(p => p.party),
        datasets: [{
          data: processedStats.map(p => p.voteCount),
          percentages: processedStats.map(p => p.percentage.toFixed(2))
        }]
      }
    });

  } catch (error) {
    console.error('Error fetching vote statistics:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch vote statistics',
      details: error.message 
    });
  }
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Cleanup on exit
process.on('exit', () => {
  connection.end();
  console.log('Database connection closed');
});
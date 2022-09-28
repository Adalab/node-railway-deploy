const cors = require('cors');
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

// create and config server
const app = express();
app.use(cors());
app.use(express.json());

// init express aplication
const serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log(`Server listening at port: ${serverPort}`);
});


const db = new Database('./src/data/users.db', { verbose: console.log });

app.get('/user', (req, res) => {
  console.log('Han llamado al endpoint /user');

  const query = db.prepare(`SELECT * FROM users`);
  const allUsers = query.all();
  console.log(allUsers);

  res.json({
    success: true,
    result: 'Has llamado al endpoint /user'
  });
});

// config express static server
const staticServerPath = './public';
app.use(express.static(staticServerPath));

// not found error
app.get('*', (req, res) => {
  // relative to this directory
  const notFoundFileRelativePath = '../public/404-not-found.html';
  const notFoundFileAbsolutePath = path.join(__dirname, notFoundFileRelativePath);
  res.status(404).sendFile(notFoundFileAbsolutePath);
});

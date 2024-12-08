const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./items.db', (err) => {
  if (err) {
    console.error('Could not connect to the database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create the items table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTO INCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;

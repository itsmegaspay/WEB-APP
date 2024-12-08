const db = require('../models/db');

// Get all items
exports.getAllItems = (req, res) => {
  db.all('SELECT * FROM items ORDER BY date_created DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

// Create a new item
exports.createItem = (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.run(query, [name, description], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name, description });
    }
  });
};

// Update an existing item
exports.updateItem = (req, res) => {
  const { name, description } = req.body;
  const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.run(query, [name, description, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ id: req.params.id, name, description });
    }
  });
};

// Partially update an item
exports.updatePartialItem = (req, res) => {
  const { name, description } = req.body;
  let query = 'UPDATE items SET ';
  let params = [];
  
  if (name) {
    query += 'name = ?, ';
    params.push(name);
  }
  
  if (description) {
    query += 'description = ?, ';
    params.push(description);
  }

  query = query.slice(0, -2); // Remove trailing comma
  query += ' WHERE id = ?';
  params.push(req.params.id);

  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ id: req.params.id, name, description });
    }
  });
};

// Delete an item
exports.deleteItem = (req, res) => {
  const query = 'DELETE FROM items WHERE id = ?';
  db.run(query, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.status(204).send();
    }
  });
};

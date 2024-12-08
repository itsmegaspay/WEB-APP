const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/items', itemsRouter);

// Home route to display items
app.get('/', (req, res) => {
  res.render('index');  // render the main page
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();

// Define the data array
let data = [
  {
    id: 1,
    imgUrl: "assets/about1.avif",
    title: 'العرض الاول',
    description: 'شرح العرض الاول في ايجاز'
  },
  {
    id: 2,
    imgUrl: 'assets/about3.avif',
    title: 'العرض الثاني',
    description: 'شرح العرض الثاني في ايجاز'
  },
  {
    id: 3,
    imgUrl: 'assets/about2.avif',
    title:'العرض الثالث',
    description: 'شرح العرض الثالث في ايجاز'
  }
];

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get the entire array
app.get('/data', (req, res) => {
  res.status(200).json(data);
});

// Endpoint to get a specific item by ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(item => item.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).end();
  }
});

// Endpoint to add a new item to the array
app.post('/data', (req, res) => {
  const newItem = {
    id: data.length + 1,
    ...req.body
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

// Endpoint to delete all items from the array
app.delete('/data', (req, res) => {
  data = [];
  res.status(204).end();
});

// Endpoint to delete a specific item by ID
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex(item => item.id === id);
  if (itemIndex >= 0) {
    data.splice(itemIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

// Endpoint to pop the last item from the array
app.delete('/data/pop', (req, res) => {
  const poppedItem = data.pop();
  if (poppedItem) {
    res.status(200).json(poppedItem);
  } else {
    res.status(404).end();
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
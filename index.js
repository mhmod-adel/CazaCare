const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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

app.get('/api/data', (req, res) => {
  res.status(200).json(data);
});

app.get('/api/data/:id', (req, res) => {
  const itemId = req.params.id;
  const item = data.find(item => item.id == itemId);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found.' });
  }
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/data/:id', (req, res) => {
  const itemId = req.params.id;
  const index = data.findIndex(item => item.id == itemId);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    res.status(200).json(deletedItem);
  } else {
    res.status(404).json({ message: 'Item not found.' });
  }
});

app.delete('/api/data', (req, res) => {
  data = [];
  res.status(200).json({ message: 'All items deleted successfully.' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let categories = [
    { id: 1, name: "az"},
    { id: 2, name: "bm"},
    { id: 3, name: "jj"},
    { id: 4, name: "yg"},
];

app.get('/categories', async (req, res) => {
    res.json(categories)
});

app.get('/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(category => category.id === id);

    if(category){
        res.json(category)
    }
    else{
        res.status(404).json({error: 'Category not found'});
    }
});

// add category
app.post('/categories', (req, res) => {
    const { name } = req.body;
    const id = categories.length ? categories[categories.length - 1].id + 1 : 1;
    const category = { id, name };
  
    categories.push(category);
    res.status(201).json(category);
});

// modify category
app.put('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
  
    let category = categories.find(category => category.id === id);
  
    if (!category) return res.status(404).json({ message: 'Category not found.' });
  
    category.name = name;
  
    res.status(200).json(category);
  });
  
  // delete category
  app.delete('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let category = categories.find(category => category.id === id);
  
    if (!category) return res.status(404).json({ message: 'Category not found.' });
  
    categories = categories.filter(category => category.id !== id);
    res.status(200).json({ message: 'Deleted category.' });
  });

app.listen(5000, () => {
    console.log("Microservices started at Port 5000")
});
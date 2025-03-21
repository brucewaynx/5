const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let authors = [
    { id: 1, name: "aa"},
    { id: 2, name: "bb"},
    { id: 3, name: "cc"},
    { id: 4, name: "dd"},
];

app.get('/authors', async (req, res) => {
    res.json(authors)
});

app.get('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(author => author.id === id);

    if(author){
        res.json(author)
    }
    else{
        res.status(404).json({error: 'Author not found'});
    }
});

// add author
app.post('/authors', (req, res) => {
    const { name } = req.body;
    const id = authors.length ? authors[authors.length - 1].id + 1 : 1;
    const author = { id, name };
  
    authors.push(author);
    res.status(201).json(author);
});

// modify author
app.put('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
  
    let author = authors.find(author => author.id === id);
  
    if (!author) return res.status(404).json({ message: 'Author not found.' });
  
    author.name = name;
  
    res.status(200).json(author);
  });
  
  // delete author
app.delete('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let author = authors.find(author => author.id === id);
  
    if (!author) return res.status(404).json({ message: 'Author not found.' });
  
    authors = authors.filter(author => author.id !== id);
    res.status(200).json({ message: 'Deleted author.' });
});

app.listen(4000, () => {
    console.log("Microservices started on Port 4000")
});
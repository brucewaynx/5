const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { title } = require('process');

const app = express();

app.use(bodyParser.json());

let books = [
    { id: 1, title: "Book 1", authorId: 1, categoryId: 1},
    { id: 2, title: "Book 2", authorId: 2, categoryId: 2},
    { id: 3, title: "Book 3", authorId: 3, categoryId: 3},
    { id: 4, title: "Book 4", authorId: 4, categoryId: 4},
];

app.get('/books', async (req, res) => {
    res.json(books)
});

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);

    if(book){
        try {
            const authorResponse = await axios.get(`http://localhost:4000/authors/${book.authorId}`);
            const categoryResponse = await axios.get(`http://localhost:5000/categories/${book.categoryId}`);
            const author = authorResponse.data;
            const category = categoryResponse.data;

            const bookDetails = {
                id: book.id,
                title: book.title,
                author: author.name,
                category: category.name
            };

            res.json(bookDetails);

        } catch (error){
        res.status(500).json({error: 'Error when recovering the details of the book'});
        }      
    }
    else{
        res.status(404).json({error: 'Book not found'});
    }
});

// add book
app.post('/books', (req, res) => {
    const { title, authorId, categoryId } = req.body;
    const id = books.length ? books[books.length - 1].id + 1 : 1;
    const book = { id, title, authorId, categoryId };
  
    books.push(book);
    res.status(201).json(book);
});

// modify book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, authorId, categoryId } = req.body;
  
    let book = books.find(book => book.id === id);
  
    if (!book) return res.status(404).json({ message: 'Book not found.' });
  
    book.title = title;
    book.authorId = authorId;
    book.categoryId = categoryId;
  
    res.status(200).json(book);
  });
  
  // delete book
  app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let book = books.find(book => book.id === id);
  
    if (!book) return res.status(404).json({ message: 'Book not found.' });
  
    books = books.filter(book => book.id !== id);
    res.status(200).json({ message: 'Book deleted.' });
  });

app.listen(3000, () => {
    console.log("Microservices started at Port 3000");
});
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Root endpoint for basic health check
app.get("/", (req, res) => {
    res.send("API Gateway is working! Try accessing /authors, /books, or /categories");
});

// Proxy routes to respective services
app.use('/authors', createProxyMiddleware({
    target: 'http://localhost:3000', // AuthorService (Port 3000)
    changeOrigin: true,
}));

app.use('/books', createProxyMiddleware({
    target: 'http://localhost:4000', // BookService (Port 4000)
    changeOrigin: true,
}));

app.use('/categories', createProxyMiddleware({
    target: 'http://localhost:5000', // CategorieService (Port 5000)
    changeOrigin: true,
}));

// If you'd like the API Gateway to listen on port 4000 or 5000, change the `port` variable accordingly
const port = 4000; // Change to 5000 if you want the Gateway on that port

app.listen(port, () => {
    console.log(`API Gateway is starting at http://localhost:${port}`);
});

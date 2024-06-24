import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT ||    3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// Imposta EJS come motore di visualizzazione
app.set('view engine', 'ejs');
// Rotta per la pagina principale con il form di ricerca
app.get('/', (req, res) => {
    res.render('index.ejs', { books: null, error: null });
  });
  
  /// Rotta per gestire la richiesta di ricerca
    app.post('/search', async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
  
    const params = {};
    if (title) {
      params.title = title;
    }
    if (author) {
      params.author = author;
    }
  
    try {
      const response = await axios.get('http://openlibrary.org/search.json', { params });
      const books = response.data.docs;
      res.render('index.ejs', { books: books, error: null });
    } catch (error) {
      res.render('index.ejs', { books: null, error: 'Errore durante la ricerca dei libri.' });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

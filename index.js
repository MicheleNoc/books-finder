import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import path from "path";


const app = express();
const port = process.env.PORT ||    3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Imposta EJS come motore di rendering
app.set('view engine', 'ejs');

// Imposta la directory delle viste (opzionale se 'views' è la directory predefinita)
app.set('views', path.join(__dirname, 'views'));
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

// Utilizzo di CommonJS per importare i moduli in un ambiente Node.js con type: module
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

// Middleware per gestire dati JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Imposta EJS come motore di rendering
app.set('view engine', 'ejs');
// Imposta la directory delle viste
app.set('views', path.join(__dirname, 'views'));

// Middleware per servire file statici dalla directory 'public'
app.use(express.static('public'));

// Rotta per la pagina principale con il form di ricerca
app.get('/', (req, res) => {
  res.render('index', { books: null, error: null });
});

// Rotta per gestire la richiesta di ricerca
app.post('/search', async (req, res) => {
  const { title, author } = req.body;

  try {
    const response = await axios.get('http://openlibrary.org/search.json', {
      params: { title, author }
    });
    const books = response.data.docs;
    res.render('index.ejs', { books, error: null });
  } catch (error) {
    console.error('Errore durante la ricerca dei libri:', error.message);
    res.render('index.ejs', { books: null, error: 'Errore durante la ricerca dei libri.' });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

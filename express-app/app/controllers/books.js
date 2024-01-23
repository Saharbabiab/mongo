const {
  getAllBooks,
  getBook,
  getBookByTitle,
  getBookByGenre,
  getBookByPublishingYear,
  getBookByAuthorCountry,
  getBookByAuthor,
  createBook,
  deleteBook,
} = require("../services/books");
const { plceAuthor } = require("../DB/books");

module.exports = {
  listBooks: async (req, res) => {
    const pn = req.params.pg;
    return getAllBooks(pn);
  },
  getBook: async (req, res) => {
    try {
      const id = req.params.id;
      const book = await getBook(id);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByTitle: async (req, res) => {
    try {
      const word = req.params.word;
      const books = await getBookByTitle(word);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByGenre: async (req, res) => {
    try {
      const word = req.params.word;
      const books = await getBookByGenre(word);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByPublishingYear: async (req, res) => {
    try {
      const word = req.params.word;
      const books = await getBookByPublishingYear(word);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByAuthorCountry: async (req, res) => {
    try {
      const word = req.params.word;
      const books = await getBookByAuthorCountry(word);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByAuthor: async (req, res) => {
    try {
      const author = req.params.author;
      const books = await getBookByAuthor(author);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createBook: async (req, res) => {
    try {
      const books = req.body;
      if (books.length > 1) {
        for (let i = 0; i < books.length; i++) {
          const { title, publishingyear, genres, authors, quantity, price } =
            books[i];
          const newBook = await createBook(
            title,
            publishingyear,
            genres,
            authors,
            quantity,
            price
          );
        }
      } else {
        const { title, publishingyear, genres, authors, quantity, price } =
          req.body;
        const newBook = await createBook(
          title,
          publishingyear,
          genres,
          authors,
          quantity,
          price
        );
      }
      plceAuthor();
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const id = req.params.id;
      const book = await deleteBook(id);
      res.json(book);
    } catch (arr) {
      res.status(500).send(err);
    }
  },
};

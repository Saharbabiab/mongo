const Books = require("../models/book");

module.exports = {
  getAllBooks: async (pn) => {
    return Books.find({})
      .skip(pn * 10)
      .limit(10);
  },
  getBook: async (strId) => {
    const book = await Books.findOne({ _id: strId });
    return {
      book: {
        id: book._id,
        title: book.title,
        publishingyear: book.publishingyear,
        genres: book.genres,
        authors: book.authors,
        quantity: book.quantity,
        price: book.price,
      },
    };
  },
  getBookPrice: async (strId) => {
    const book = await Books.findOne({ _id: strId });
    return book.price;
  },
  getBookByTitle: async (word) => {
    const books = await Books.find({ title: { $regex: word, $options: "i" } });
    return books.map((b) => ({
      id: b._id,
      title: b.title,
      publishingyear: b.publishingyear,
      genres: b.genres,
      authors: b.authors,
      quantity: b.quantity,
      price: b.price,
    }));
  },
  getBookByGenre: async (word) => {
    const books = await Books.find({ genres: { $regex: word, $options: "i" } });
    return books.map((b) => ({
      id: b._id,
      title: b.title,
      publishingyear: b.publishingyear,
      genres: b.genres,
      authors: b.authors,
      quantity: b.quantity,
      price: b.price,
    }));
  },
  getBookByPublishingYear: async (word) => {
    const books = await Books.find({
      publishingyear: { $regex: word, $options: "i" },
    });
    return books.map((b) => ({
      id: b._id,
      title: b.title,
      publishingyear: b.publishingyear,
      genres: b.genres,
      authors: b.authors,
      quantity: b.quantity,
      price: b.price,
    }));
  },
  getBookByAuthorCountry: async (word) => {
    const books = await Books.find({
      "authors.country": { $regex: word, $options: "i" },
    });
    return books.map((b) => ({
      id: b._id,
      title: b.title,
      publishingyear: b.publishingyear,
      genres: b.genres,
      authors: b.authors,
      quantity: b.quantity,
      price: b.price,
    }));
  },
  getBookByAuthor: async (author) => {
    const books = await Books.find({ authors: author });
    return books.map((b) => ({
      id: b._id,
      title: b.title,
      publishingyear: b.publishingyear,
      genres: b.genres,
      authors: b.authors,
      quantity: b.quantity,
      price: b.price,
    }));
  },
  createBook: async (
    title,
    publishingyear,
    genres,
    authors,
    quantity,
    price
  ) => {
    const newBook = new Books({
      title,
      publishingyear,
      genres,
      authors,
      quantity,
      price,
    });
    return newBook.save();
  },
  deleteBook: async (strId) => {
    const book = await Books.findOne({ _id: strId });
    await Books.deleteOne({ _id: strId });
    return {
      book: {
        id: book._id,
        title: book.title,
        publishingyear: book.publishingyear,
        genres: book.genres,
        authors: book.authors,
        quantity: book.quantity,
        price: book.price,
      },
    };
  },
  decresQuantity: async (strId) => {
    try {
      const book = await Books.findOne({ _id: strId });
      const newQuantity = book.quantity - 1;
      await Books.updateOne({ _id: strId }, { quantity: newQuantity });
      return {
        book: {
          id: book._id,
          title: book.title,
          publishingyear: book.publishingyear,
          genres: book.genres,
          authors: book.authors,
          quantity: newQuantity,
          price: book.price,
        },
      };
    } catch (err) {
      console.log(err);
    }
  },
};

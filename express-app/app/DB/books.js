const Books = require("../models/book");
const books = require("../services/books");

const bookDB = {
  plceAuthor: () => {
    return Books.aggregate([
      {
        $unwind: {
          path: "$authors",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "authors",
        },
      },
    ]);
  },
};

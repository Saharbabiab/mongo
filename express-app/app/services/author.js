const Author = require("../models/author");

module.exports = {
  crateAuthor: async (name, country) => {
    const author = new Author({
      name: name,
      country: country,
    });
    return author.save();
  },
  updateAuthor: async (id, name, country) => {
    return Author.updateOne({ _id: id }, { name: name, country: country });
  },
  getAuthor: async (id) => {
    const author = await Author.findOne({ _id: id });
    return {
      id: author._id,
      name: author.name,
    };
  },
};

const { crateAuthor, updateAuthor } = require("../services/author");

module.exports = {
  createAuthor: async (req, res) => {
    try {
      const name = req.body.name;
      const country = req.body.country;
      const author = await crateAuthor(name, country);
      res.json(author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const name = req.body.name;
      const country = req.body.country;
      const author = await updateAuthor(id, name, country);
      res.json(author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

const controller = require("../controllers/books");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/:pg", cacheNoStore, controller.listBooks);
router.get("/:id", cacheNoStore, controller.getBook);
router.get("/title/:word", cacheNoStore, controller.getBookByTitle);
router.get("/genre/:word", cacheNoStore, controller.getBookByGenre);
router.get(
  "/publishingyear/:word",
  cacheNoStore,
  controller.getBookByPublishingYear
);
router.get(
  "/authorcountry/:word",
  cacheNoStore,
  controller.getBookByAuthorCountry
);
router.get("/author/:author", cacheNoStore, controller.getBookByAuthor);
router.post("/", cacheNoStore, controller.createBook);
router.delete("/del/:id", cacheNoStore, controller.deleteBook);

module.exports = router;

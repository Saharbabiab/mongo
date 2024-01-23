const controller = require("../controllers/author");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.createAuthor);
router.put("/:id", cacheNoStore, controller.updateAuthor);

module.exports = router;

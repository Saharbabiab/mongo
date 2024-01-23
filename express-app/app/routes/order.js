const controller = require("../controllers/order");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrder);
router.get("/highestprice/:date1/:date2", controller.highestPrice);
router.post("/", controller.createOrder);
router.get("/top3genres/:date1/:date2", controller.top3genres);
router.get("/totalprice/:date1/:date2", controller.totalPrice);
router.get("/top5author/:date1/:date2", controller.top5Author);

module.exports = router;

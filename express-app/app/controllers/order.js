const {
  createOrder,
  getAllOrders,
  getOrder,
  highestPrice,
  top3genres,
  totalPrice,
  top5Author,
} = require("../services/orders");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const items = req.body;
      const newOrder = await createOrder(items.items);
      res.json(newOrder);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllOrders: async (req, res) => {
    const orders = await getAllOrders();
    res.json(orders);
  },

  getOrder: async (req, res) => {
    const id = req.params.id;
    const order = await getOrder(id);
    res.json(order);
  },
  highestPrice: async (req, res) => {
    const date1 = new Date(req.params.date1);
    const date2 = new Date(req.params.date2);
    const order = await highestPrice(date1, date2);
    res.json(order);
  },
  top3genres: async (req, res) => {
    const date1 = new Date(req.params.date1);
    const date2 = new Date(req.params.date2);
    const order = await top3genres(date1, date2);
    res.json(order);
  },
  totalPrice: async (req, res) => {
    const date1 = new Date(req.params.date1);
    const date2 = new Date(req.params.date2);
    const order = await totalPrice(date1, date2);
    res.json(order);
  },
  top5Author: async (req, res) => {
    const date1 = new Date(req.params.date1);
    const date2 = new Date(req.params.date2);
    const order = await top5Author(date1, date2);
    res.json(order);
  },
};

const Orders = require("../models/orders");
const { getBookPrice, decresQuantity } = require("../services/books");
const { getAuthor } = require("../services/author");
const { get } = require("mongoose");

module.exports = {
  getAllOrders: async () => {
    return Orders.find();
  },
  getOrder: async (strId) => {
    const order = await Orders.findOne({ _id: strId });
    return {
      order: {
        _id: order._id,
        items: order.items,
        total: order.total,
        date: order.date,
      },
    };
  },
  highestPrice: async (date1, date2) => {
    console.log(date1, date2);
    const order = await Orders.find({
      date: { $gte: date1, $lte: date2 },
    })
      .sort({ total: -1 })
      .limit(1);
    return order;
  },

  createOrder: async (items) => {
    try {
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        const price = await getBookPrice(items[i]);
        sum += price;
        await decresQuantity(items[i]);
      }
      const newOrder = new Orders({
        items: items,
        total: sum,
        date: Date.now(),
      });
      return newOrder.save();
    } catch (err) {
      console.log(err);
    }
  },
  top3genres: async (date1, date2) => {
    const order = await Orders.aggregate([
      {
        $match: {
          date: { $gte: date1, $lte: date2 },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items",
          foreignField: "_id",
          as: "item",
        },
      },
      {
        $unwind: "$item",
      },
      {
        $unwind: "$item.genres",
      },
      {
        $group: {
          _id: "$item.genres",
          total: {
            $sum: "$item.price",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    return order.map((o) => {
      return {
        genre: o._id,
      };
    });
  },
  totalPrice: async (date1, date2) => {
    const order = await Orders.aggregate([
      {
        $match: {
          date: { $gte: date1, $lte: date2 },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items",
          foreignField: "_id",
          as: "item",
        },
      },
      {
        $unwind: "$item",
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$item.price",
          },
        },
      },
    ]);
    return order;
  },
  top5Author: async (date1, date2) => {
    //return author names
    const order = await Orders.aggregate([
      {
        $match: {
          date: { $gte: date1, $lte: date2 },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items",
          foreignField: "_id",
          as: "item",
        },
      },
      {
        $unwind: "$item",
      },
      {
        $lookup: {
          from: "authors",
          localField: "item.authors",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $group: {
          _id: "$author.name",
          total: {
            $sum: "$item.price",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    return order.map((o) => o._id);
  },
};

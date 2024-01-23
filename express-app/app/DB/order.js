const Order = require("../models/orders");

const orderDB = {
  topGenres: async (date1, date2) => {
    return Order.find({
      date: { $gte: date1, $lte: date2 },
    }).sort({ total: -1 });
  },
  topAuthors: async (date1, date2) => {
    return Order.find({
      date: { $gte: date1, $lte: date2 },
    }).sort({ total: -1 });
  },
  getPtice: async (id) => {},
};

// [
//   {
//     $group: {
//       _id: null,
//       totalSum: {
//         $sum: {
//           $multiply: ["$quantity", "$price"],
//         },
//       },
//     },
//   },
// ];

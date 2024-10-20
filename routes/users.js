const express = require("express");
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,updateUserData
} = require("../controllers/user-controller");
const users = require("../data/users.json");

const router = express.Router();
const { UserModel, BookModel } = require("../models/index");
router.get("/", getAllUsers);
router.get("/:id", getSingleUserById);
// router.post("/", (req, res) => {
//   const { id, name, surname, subscriptionType, subscriptionDate } = req.body;
//   const user = users.find((each) => each.id === id);
//   if (user) {
//     return res.status(200).json({ sucess: false, message: "User exist" });
//   }
//   users.push({ id, name, surname, subscriptionType, subscriptionDate });
//   return res
//     .status(200)
//     .json({ sucess: true, message: "User Added Sucessfully", data: users });
// });
router.put("/:id",updateUserData);
router.delete("/:id",deleteUser);
// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User does not exist",
//     });
//   }

//   const getDateInDays = (data) => {
//     let date;
//     if (!data) {
//       date = new Date();
//     } else {
//       date = new Date(data);
//     }
//     const today = new Date();
//     const diffTime = Math.abs(date - today);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   const subscriptionTypeExpiration = (type, date) => {
//     let expirationDate = new Date(date);
//     if (type === "Basic") {
//       expirationDate.setDate(expirationDate.getDate() + 90);
//     } else if (type === "Standard") {
//       expirationDate.setDate(expirationDate.getDate() + 180);
//     } else if (type === "Premium") {
//       expirationDate.setDate(expirationDate.getDate() + 365);
//     }
//     return expirationDate;
//   };

//   const currentDate = new Date();
//   const subscriptionDate = new Date(user.subscriptionDate);
//   const returnDate = new Date(user.returnDate);

//   const daysLeftForExpiration = Math.ceil(
//     (subscriptionTypeExpiration(user.subscriptionType, subscriptionDate) -
//       currentDate) /
//       (1000 * 60 * 60 * 24)
//   );
//   const isSubscriptionExpired =
//     currentDate >
//     subscriptionTypeExpiration(user.subscriptionType, subscriptionDate);
//   const fine =
//     returnDate < currentDate ? (isSubscriptionExpired ? 100 : 50) : 0;

//   const subscriptionDetails = {
//     ...user,
//     daysLeftForExpiration:
//       daysLeftForExpiration > 0 ? daysLeftForExpiration : 0,
//     isSubscriptionExpired,
//     fine,
//   };

//   return res.status(200).json({
//     success: true,
//     message: "Subscription details of the user",
//     data: subscriptionDetails,
//   });
// });

module.exports = router;

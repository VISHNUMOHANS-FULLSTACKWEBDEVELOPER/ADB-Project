const express=require("express");
const users = require("../data/users.json");

const router=express.Router();


router.get("/", (req, res) => {
  res.status(200).json({ sucess: true, data: users });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({ sucess: false, message: "User doesnot exist" });
  }
  return res
    .status(200)
    .json({ sucess: true, message: "User Found", data: user });
});
router.post("/", (req, res) => {
  const { id, name, surname, subscriptionType, subscriptionDate } = req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(200).json({ sucess: false, message: "User exist" });
  }
  users.push({ id, name, surname, subscriptionType, subscriptionDate });
  return res
    .status(200)
    .json({ sucess: true, message: "User Added Sucessfully", data: users });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res
      .status(404)
      .json({ sucess: false, message: "User does not exist" });
  }
  const updatedUsers = users.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  users.push(...updatedUsers);
  return res
    .status(200)
    .json({ sucess: true, message: "Updated User", data: updatedUsers });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res
      .status(404)
      .json({ sucess: false, message: "User does not exist" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res
    .status(200)
    .json({ sucess: true, message: "Deleted User", data: users });
});
module.exports= router;

const express = require("express");
const {
  getAllBook,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById
} = require("../controllers/book-controller");
const router = express.Router();
const books = require("../data/books.json");
const users = require("../data/users.json");
const {UserModel,BookModel}=require("../models/index");
router.get("/", getAllBook);
router.get("/issued", getAllIssuedBooks);
router.get("/:id", getSingleBookById);
router.post("/",addNewBook);
router.put("/updateBook/:id",updateBookById);
  
module.exports=router;
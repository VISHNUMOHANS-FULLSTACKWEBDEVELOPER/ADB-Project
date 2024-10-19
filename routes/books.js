const express = require("express");
const router = express.Router();
const books = require("../data/books.json");
const users = require("../data/users.json");
router.get("/", (req, res) => {
  res.status(200).json({ sucess: true,message:"Get all books", data: books });
});
router.get("/issued", (req, res) => {
  const userWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBook = [];
  userWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBook.push(book);
  });
  if (issuedBook.length === 0) {
    return res.status(404).json({ sucess: false, message: "No Book Issued" });
  }
  return res
    .status(200)
    .json({
      sucess: true,
      message: "Users with Book Issued",
      data: issuedBook,
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    res.status(404).json({ sucess: false, message: "Book not found" });
  }
  return res
    .status(200)
    .json({ sucess: true, message: "Book Found", data: book });
});

module.exports=router;
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
router.post("/", (req, res) => {
  const {data}= req.body;
 
  if (!data) {
    return res.status(400).json({ sucess: false, message: "No data to add a book" });
  }
  const book=books.find((each)=>each.id===data.id)
  if(book){
    return res.status(404).json({sucess:false,message:"id already exist"})
  }
  const allBooks={...books,data};
  return res
    .status(201)
    .json({ sucess: true, message: "Book Added Sucessfully", data: allBooks });
});
router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res
      .status(404)
      .json({ sucess: false, message: "Book does not exist" });
  }
  const updatedBooks = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  books.push(...updatedBooks);
  return res
    .status(200)
    .json({ sucess: true, message: "Updated Books", data: updatedBooks });
});
router.get("/subscripion-details/:id",(req,res)=>{
  const {id}=req.params;
  const user=users.find((each)=>each.id===id);
  if(!user){
    return res.status(404).json({
     sucess:false,
     message:"User doesnot exist"
    });
  }
  const getDateInDays=(data="")=>{
    let date;
    if(data===""){
      data=new Date();
    }else{
      date=new Date(data)
    }
    let days=Math.floor(data/(1000*60*60*24));
    return days;
  };
  const subscriptionType=(date)=>{
    if ((user.subscriptionType = "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType = "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType = "Premium")) {
      date = date + 365;
    }
  }
})
module.exports=router;
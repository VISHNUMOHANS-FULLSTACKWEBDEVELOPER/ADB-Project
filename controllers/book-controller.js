const { UserModel, BookModel } = require("../models/index");
const issuedBook=require("../dtos/book-dtos");
const IssuedBook = require("../dtos/book-dtos");
exports.getAllBook =async (req,res) => {
    const books=await BookModel.find();
    if(books.length===0){
        return res
          .status(404)
          .json({ sucess: false, message: "No Book found" });
    } return res.status(200).json({ sucess: true, message: "All Book found",data:books});
};
exports.getSingleBookById = async(req,res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    res.status(404).json({ sucess: false, message: "Book not found" });
  }
  return res
       .status(200)
      .json({ sucess: true, message: "Book Found", data: book });
};
exports.getAllIssuedBooks=async(req,res)=>{
    const users=await UserModel.find({issuedBook:{$exists:true},}).populate("issuedBook");

    const issuedBook=users.map((each)=>new IssuedBook(each));
    if (issuedBook.length === 0) {
      return res.status(404).json({ sucess: false, message: "No Book Issued" });
    }
    return res.status(200).json({
      sucess: true,
      message: "Users with Book Issued",
      data: issuedBook,
    });
}
exports.addNewBook=async(req,res)=>{
  const {data}= req.body;
 
  if (!data) {
    return res.status(400).json({ sucess: false, message: "No data to add a book" });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();
  return res
    .status(201)
    .json({sucess: true, message: "Book Added Sucessfully", data: allBooks});
};
exports.updateBookById=async(req,res)=>{
const { id } = req.params;
const { data } = req.body;
const updatedBook =await BookModel.findOneAndUpdate(
  {
    _id:id,
  },data
  ,{new:true});
return res
  .status(200)
  .json({ sucess: true, message: "Updated Books", data: updatedBook });
};

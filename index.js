const express=require("express");
const dotenv=require("dotenv");

const DbConnection=require("./databaseConnecion");

const userRouter=require("./routes/users.js")
const booksRouter = require("./routes/books.js");



dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Server is up and running:-"})
})
app.use("/users",userRouter)
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "This route doesnot exist" });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
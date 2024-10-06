const express=require("express");
const users=require("./data/users.json");
const books = require("./data/books.json");
const app=express();
const PORT=8081;
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({message:"Server is up and running:-"})
})
app.get("/users", (req, res) => {
  res.status(200).json({ sucess: true, data: users });
});
app.get("/users/:id", (req, res) => {
 const {id}=req.params;
 const user=users.find((each)=>each.id===id);
 if(!user){
  res.status(404).json({ sucess: false, message:"User doesnot exist"});
 }
 return res
   .status(200)
   .json({ sucess: true, message: "User Found", data: users });
});
app.post("/users", (req, res) => {
  const { id, name, surname, subscriptionType, subscriptionDate } = req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
   return res
     .status(200)
     .json({ sucess: false, message: "User exist" });
  }
   users.push({ id, name, surname, subscriptionType, subscriptionDate });
   return res
     .status(200)
     .json({ sucess: true, message: "User Added Sucessfully", data: users });
});
app.put("/users/:id", (req, res) => {
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
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res
      .status(404)
      .json({ sucess: false, message: "User does not exist" });
  }
})
app.get("*", (req, res) => {
  res.status(404).json({ message: "This route doesnot exist" });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
const { UserModel, BookModel } = require("../models/index");


exports.getAllUsers=async(req,res)=>{
    const users=await UserModel.find();
    if(users.length===0){
     res.status(404).json({ sucess: false, message:"No Users Found"});
    }
    res
      .status(200)
      .json({ sucess: true, message: "Users Found", data: users });
};
exports.getSingleUserById=async(req,res)=>{
  const { id } = req.params;
  const user = await UserModel.findById();
  if (!user) {
    res.status(404).json({ sucess: false, message: "User doesnot exist" });
  }
  return res
    .status(200)
    .json({ sucess: true, message: "User Found", data: user });
};
exports.deleteUser=async(req,res)=>{
  const { id } = req.params;
  const user = await UserModel.deleteOne({_id:id});
  
  if (!user) {
    return res
      .status(404)
      .json({ sucess: false, message: "User does not exist" });
  }
  return res
    .status(200)
    .json({ sucess: true, message: "Deleted User", data: users });
};
exports.updateUserData=async(req,res)=>{

  const { id } = req.params;
  const { data } = req.body;
  const updatedUser = await UserModel.findOneAndUpdate(
    {_id:id},
    {$set:{...data}},
    {new:true});
  return res
    .status(200)
    .json({ sucess: true, message: "Updated User", data: updatedUser });
};
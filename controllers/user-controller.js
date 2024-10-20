const { UserModel, BookModel } = require("../models/index");


exports.getAllUsers=async(req,res)=>{
    const users=await UserModel.find();
    if(users.length===0){
     return res
       .status(404)
       .json({ sucess: false, message: "No Users Found"});
    }
    return res
      .status(200)
      .json({ sucess: true, message: "Users Found", data:users});
};
exports.getSingleUserById=async(req,res)=>{
  const { id } = req.params;
  const users = await UserModel.findById(id);
  if (!users) {
    return res.status(404).json({ sucess: false, message: "User doesnot exist" });
  }
   res
    .status(200)
    .json({ sucess: true, message: "User Found", data: users });
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
    .json({ sucess: true, message: "Deleted User", data: user });
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
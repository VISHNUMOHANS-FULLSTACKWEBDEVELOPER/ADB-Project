const { UserModel, BookModel } = require("../models/index");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  if (users.length === 0) {
    return res
      .status(404)
      .json({ sucess: false, message: "No Users Found" });
  }
  return res
    .status(200)
    .json({ sucess: true, message: "Users Found", data: users });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ sucess: false, message: "User does not exist" });
  }
  res
    .status(200)
    .json({ sucess: true, message: "User Found", data: user });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  
  // Perform the delete operation
  const user = await UserModel.deleteOne({ _id: id });

  // Check if the user exists
  if (user.deletedCount === 0) {
    return res.status(404).json({ sucess: false, message: "User does not exist" });
  }

  // Fetch remaining users
  const remainingUsers = await UserModel.find();

  // Return the response with remaining users
  return res.status(200).json({ 
    sucess: true, 
    message: "Deleted User", 
    data: remainingUsers 
  });
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the URL params
  const { data } = req.body;  // Get the data to update from the request body

  try {
    // Find the current user details
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prepare the update data, merging current user data with the new data
    const updatedData = {
      ...user.toObject(), // Current user data
      ...data, // New data to update
    };

    // Update the user in the database
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },  // Apply the updated fields
      { new: true }  // Return the updated user document
    );

    // If no user found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare old and new values to create the response with updated and unchanged fields
    const responseUser = {
      _id: updatedUser._id,
      users: [
        {
          id: updatedUser._id,
          name: updatedData.name !== updatedUser.name ? updatedUser.name : user.name, // Show updated name if changed
          surname: updatedData.surname !== updatedUser.surname ? updatedUser.surname : user.surname, // Show updated surname if changed
          email: updatedData.email !== updatedUser.email ? updatedUser.email : user.email, // Show updated email if changed
          issuedBook: updatedData.issuedBook !== updatedUser.issuedBook ? updatedUser.issuedBook : user.issuedBook, // Show updated issuedBook if changed
          issuedDate: updatedData.issuedDate !== updatedUser.issuedDate ? updatedUser.issuedDate : user.issuedDate, // Show updated issuedDate if changed
          returnDate: updatedData.returnDate !== updatedUser.returnDate ? updatedUser.returnDate : user.returnDate, // Show updated returnDate if changed
          subscriptionType: updatedData.subscriptionType !== updatedUser.subscriptionType ? updatedUser.subscriptionType : user.subscriptionType, // Show updated subscriptionType if changed
          subscriptionDate: updatedData.subscriptionDate !== updatedUser.subscriptionDate ? updatedUser.subscriptionDate : user.subscriptionDate // Show updated subscriptionDate if changed
        }
      ],
      name: updatedUser.name,  // Display the updated name
      surname: updatedUser.surname,  // Display the updated surname
      updatedAt: updatedUser.updatedAt
    };

    // Return the response with the updated user details
    return res.status(200).json({
      success: true,
      message: "User updated",
      data: responseUser
    });
  } catch (err) {
    // Handle any errors (e.g., invalid data format)
    return res.status(500).json({ success: false, message: "Error updating user", error: err.message });
  }
};



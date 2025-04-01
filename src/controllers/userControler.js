const { getUserById, updateUser, deleteUser } = require("../models/User");

// ✅ Get User Profile
const getProfile = async (req, res) => {
    const {userId} = req.body;
  console.log(userId,'userId')

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update User Profile
const updateProfile = async (req, res) => {
    const {userId} = req.body;
//   const userId = req.user.userId;
  const { username,profile_image, bio} = req.body;

  try {
    const updatedUser = await updateUser(userId, { username,profile_image, bio});
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete User Account
const deleteAccount = async (req, res) => {
//   const userId = req.user.userId;
const {userId} = req.body;

  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });

  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
};

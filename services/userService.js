const User = require('../models/user');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (userId) => {
  return await User.findById(userId).exec();
};

const getUsers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find().skip(skip).limit(limit).exec();
  const total = await User.countDocuments().exec();
  return {
    total,
    page,
    limit,
    users
  };
};


const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true }).exec();
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId).exec();
};

const getUserByName = async (name) => {
  return await User.find({ name: new RegExp(name, 'i') }).exec();
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByName,
};

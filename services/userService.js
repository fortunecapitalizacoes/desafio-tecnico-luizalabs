const User = require('../models/user');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (userId) => {
  return await User.findById(userId).exec();
};

const getUsers = async (query) => {
  return await User.find(query).exec();
};

const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true }).exec();
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId).exec();
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};

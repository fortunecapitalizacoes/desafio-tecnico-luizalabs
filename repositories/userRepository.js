const User = require('../models/user');

class UserRepository {
  async createUser(user) {
    return await User.create(user);
  }

  async getUserById(userId) {
    return await User.findOne({ user_id: userId });
  }

  async getUsers(filter) {
    return await User.find(filter);
  }

  async updateUser(userId, user) {
    return await User.findOneAndUpdate({ user_id: userId }, user, { new: true });
  }

  async deleteUser(userId) {
    return await User.findOneAndDelete({ user_id: userId });
  }
}

module.exports = new UserRepository();

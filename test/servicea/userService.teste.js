const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const mongoose = require('mongoose');
const User = require('../models/user');
const userService = require('../services/userService'); // Ajuste o caminho conforme necessário

describe('User Service', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { user_id: '123', name: 'John Doe' };
      const user = new User(userData);
      sandbox.stub(User.prototype, 'save').resolves(user);

      const result = await userService.createUser(userData);

      expect(result).to.equal(user);
      expect(User.prototype.save.calledOnce).to.be.true;
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const userId = '123';
      const user = { user_id: userId, name: 'John Doe' };
      sandbox.stub(User, 'findById').returns({ exec: () => Promise.resolve(user) });

      const result = await userService.getUserById(userId);

      expect(result).to.deep.equal(user);
      expect(User.findById.calledWith(userId)).to.be.true;
    });
  });

  describe('getUsers', () => {
    it('should get users with pagination', async () => {
      const page = 1;
      const limit = 10;
      const users = [{ user_id: '123', name: 'John Doe' }];
      sandbox.stub(User, 'find').returns({ skip: () => ({ limit: () => ({ exec: () => Promise.resolve(users) }) }) });
      sandbox.stub(User, 'countDocuments').returns({ exec: () => Promise.resolve(1) });

      const result = await userService.getUsers(page, limit);

      expect(result).to.deep.equal({
        total: 1,
        page,
        limit,
        users
      });
      expect(User.find.calledOnce).to.be.true;
      expect(User.countDocuments.calledOnce).to.be.true;
    });
  });

  describe('updateUser', () => {
    it('should update a user by ID', async () => {
      const userId = '123';
      const userData = { name: 'Jane Doe' };
      const updatedUser = { user_id: userId, name: 'Jane Doe' };
      sandbox.stub(User, 'findByIdAndUpdate').returns({ exec: () => Promise.resolve(updatedUser) });

      const result = await userService.updateUser(userId, userData);

      expect(result).to.deep.equal(updatedUser);
      expect(User.findByIdAndUpdate.calledWith(userId, userData, { new: true })).to.be.true;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = '123';
      sandbox.stub(User, 'findByIdAndDelete').returns({ exec: () => Promise.resolve(null) });

      const result = await userService.deleteUser(userId);

      expect(result).to.be.null;
      expect(User.findByIdAndDelete.calledWith(userId)).to.be.true;
    });
  });

  describe('getUserByName', () => {
    it('should get users by name', async () => {
      const name = 'John';
      const users = [{ user_id: '123', name: 'John Doe' }];
      sandbox.stub(User, 'find').returns({ exec: () => Promise.resolve(users) });

      const result = await userService.getUserByName(name);

      expect(result).to.deep.equal(users);
      expect(User.find.calledWith({ name: new RegExp(name, 'i') })).to.be.true;
    });
  });
});

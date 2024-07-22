const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const User = require('../models/user');
const UserRepository = require('../repositories/userRepository'); // Ajuste o caminho conforme necessário

describe('UserRepository', () => {
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
      const createdUser = new User(userData);
      sandbox.stub(User, 'create').resolves(createdUser);

      const result = await UserRepository.createUser(userData);

      expect(result).to.equal(createdUser);
      expect(User.create.calledOnceWith(userData)).to.be.true;
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const userId = '123';
      const user = { user_id: userId, name: 'John Doe' };
      sandbox.stub(User, 'findOne').resolves(user);

      const result = await UserRepository.getUserById(userId);

      expect(result).to.deep.equal(user);
      expect(User.findOne.calledOnceWith({ user_id: userId })).to.be.true;
    });
  });

  describe('getUsers', () => {
    it('should get users with filter', async () => {
      const filter = { name: 'John' };
      const users = [{ user_id: '123', name: 'John Doe' }];
      sandbox.stub(User, 'find').resolves(users);

      const result = await UserRepository.getUsers(filter);

      expect(result).to.deep.equal(users);
      expect(User.find.calledOnceWith(filter)).to.be.true;
    });
  });

  describe('updateUser', () => {
    it('should update a user by ID', async () => {
      const userId = '123';
      const userData = { name: 'Jane Doe' };
      const updatedUser = { user_id: userId, name: 'Jane Doe' };
      sandbox.stub(User, 'findOneAndUpdate').resolves(updatedUser);

      const result = await UserRepository.updateUser(userId, userData);

      expect(result).to.deep.equal(updatedUser);
      expect(User.findOneAndUpdate.calledOnceWith({ user_id: userId }, userData, { new: true })).to.be.true;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = '123';
      const deletedUser = { user_id: userId, name: 'John Doe' };
      sandbox.stub(User, 'findOneAndDelete').resolves(deletedUser);

      const result = await UserRepository.deleteUser(userId);

      expect(result).to.deep.equal(deletedUser);
      expect(User.findOneAndDelete.calledOnceWith({ user_id: userId })).to.be.true;
    });
  });
});

describe('User controller', () => {
  let chai, chaiHttp, sinon, server, userController, UserService, fileService;
  let req, res, next;

  before(async () => {
    const [chaiModule, chaiHttpModule, sinonModule, serverModule, userControllerModule, userServiceModule, fileServiceModule] = await Promise.all([
      import('chai'),
      import('chai-http'),
      import('sinon'),
      import('../../server.js'), 
      import('../../controllers/userController.js'), 
      import('../../services/userService.js'),
      import('../../services/fileService.js')
    ]);

    chai = chaiModule.default;
    chaiHttp = chaiHttpModule.default;
    sinon = sinonModule.default;
    server = serverModule.default;
    userController = userControllerModule.default;
    UserService = userServiceModule.default;
    fileService = fileServiceModule.default;

    chai.use(chaiHttp);
  });

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      file: {}
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis()
    };
    next = sinon.stub();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = { user_id: '123', name: 'John Doe' };
      sinon.stub(UserService, 'createUser').resolves(user);

      req.body = user;

      await userController.createUser(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(user)).to.be.true;

      UserService.createUser.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(UserService, 'createUser').throws(error);

      req.body = { user_id: '123', name: 'John Doe' };

      await userController.createUser(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      UserService.createUser.restore();
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const user = { user_id: '123', name: 'John Doe' };
      sinon.stub(UserService, 'getUserById').resolves(user);

      req.params.userId = '123';

      await userController.getUserById(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(user)).to.be.true;

      UserService.getUserById.restore();
    });

    it('should return 404 if user not found', async () => {
      sinon.stub(UserService, 'getUserById').resolves(null);

      req.params.userId = '123';

      await userController.getUserById(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User not found' })).to.be.true;

      UserService.getUserById.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(UserService, 'getUserById').throws(error);

      req.params.userId = '123';

      await userController.getUserById(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      UserService.getUserById.restore();
    });
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      const users = [{ user_id: '123', name: 'John Doe' }];
      sinon.stub(UserService, 'getUsers').resolves(users);

      req.query.page = 1;
      req.query.limit = 10;

      await userController.getUsers(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(users)).to.be.true;

      UserService.getUsers.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(UserService, 'getUsers').throws(error);

      req.query.page = 1;
      req.query.limit = 10;

      await userController.getUsers(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      UserService.getUsers.restore();
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = { user_id: '123', name: 'John Doe' };
      sinon.stub(UserService, 'updateUser').resolves(user);

      req.params.userId = '123';
      req.body = user;

      await userController.updateUser(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(user)).to.be.true;

      UserService.updateUser.restore();
    });

    it('should return 404 if user not found', async () => {
      sinon.stub(UserService, 'updateUser').resolves(null);

      req.params.userId = '123';
      req.body = { name: 'John Doe' };

      await userController.updateUser(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User not found' })).to.be.true;

      UserService.updateUser.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(UserService, 'updateUser').throws(error);

      req.params.userId = '123';
      req.body = { name: 'John Doe' };

      await userController.updateUser(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      UserService.updateUser.restore();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      sinon.stub(UserService, 'deleteUser').resolves(true);

      req.params.userId = '123';

      await userController.deleteUser(req, res, next);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.send.called).to.be.true;

      UserService.deleteUser.restore();
    });

    it('should return 404 if user not found', async () => {
      sinon.stub(UserService, 'deleteUser').resolves(false);

      req.params.userId = '123';

      await userController.deleteUser(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User not found' })).to.be.true;

      UserService.deleteUser.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(UserService, 'deleteUser').throws(error);

      req.params.userId = '123';

      await userController.deleteUser(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      UserService.deleteUser.restore();
    });
  });

  describe('getUserByName', () => {
    it('should get users by name', async () => {
      const users = [{ user_id: '123', name: 'John Doe' }];
      sinon.stub(UserService, 'getUserByName').resolves(users);

      req.params.name = 'John';

      await userController.getUserByName(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(users)).to.be.true;

      UserService.getUserByName.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(UserService, 'getUserByName').throws(error);

      req.params.name = 'John';

      await userController.getUserByName(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      UserService.getUserByName.restore();
    });
  });

  describe('handleFileUpload', () => {
    it('should process uploaded file', async () => {
      sinon.stub(fileService, 'processTextFile').resolves();

      req.file.filename = 'test.txt';

      await userController.handleFileUpload(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'File processed successfully' })).to.be.true;

      fileService.processTextFile.restore();
    });

    it('should handle errors', async () => {
      const error = new Error('Something went wrong');
      sinon.stub(fileService, 'processTextFile').throws(error);

      req.file.filename = 'test.txt';

      await userController.handleFileUpload(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;

      fileService.processTextFile.restore();
    });
  });
});

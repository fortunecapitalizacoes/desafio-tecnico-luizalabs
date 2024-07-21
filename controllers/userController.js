const path = require('path');
const fileService = require('../services/fileService');
const UserService = require('../services/userService');

// Cria um novo usuário
exports.createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtém um usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtém todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await UserService.getUsers(page, limit);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Atualiza um usuário existente
exports.updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.userId, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deleta um usuário pelo ID
exports.deleteUser = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.userId);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtém usuários pelo nome
exports.getUserByName = async (req, res) => {
  try {
    const users = await UserService.getUserByName(req.params.name);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manipula upload de arquivo
exports.handleFileUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    await fileService.processTextFile(filePath);
    res.status(200).json({ message: 'File processed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

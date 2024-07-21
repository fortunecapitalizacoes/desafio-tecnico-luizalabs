const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUserById);
router.get('/users', userController.getUsers);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

// Nova rota para upload de arquivos
router.post('/upload', upload.single('file'), userController.handleFileUpload);

module.exports = router;

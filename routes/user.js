const express = require('express');


const userController = require('../controllers/user');
const userAuthentication = require('../middleware/auth');
//const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/getUsers', userAuthentication.authenticate, userController.getUsers);
router.get('/getUser', userAuthentication.authenticate, userController.getUser);
router.post('/addMessage/:userId', userAuthentication.authenticate, userController.addMessage);
router.get('/getMessages/', userAuthentication.authenticate, userController.getMessages);
// router.get('/downloadExpense', userAuthentication.authenticate, expenseController.downloadExpense);
// router.get('/viewExpenseFilesDownloaded', userAuthentication.authenticate, expenseController.viewExpenseFilesDownloaded);


module.exports = router;
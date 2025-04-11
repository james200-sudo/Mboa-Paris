const express = require('express');
const router = express.Router();
const { updateUserRole } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const { getAllUsers } = require('../controllers/userController');
const { deleteUser } = require('../controllers/userController');
const { suspendUser } = require('../controllers/userController');
const { exportUsers } = require('../controllers/userController');


router.put('/:userId/role', auth, isAdmin, updateUserRole);
router.get('/', auth, isAdmin, getAllUsers);
router.delete('/:userId', auth, isAdmin, deleteUser);
router.put('/:userId/suspend', auth, isAdmin, suspendUser);
router.get('/export', auth, isAdmin, exportUsers);


module.exports = router;

const express = require('express');
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);
router.post('/create', expenseController.create);
router.put('/update', expenseController.update);
router.delete('/:expenseId', expenseController.delete);
router.get('/summary/:groupId', expenseController.summary);
router.get('/:groupId', expenseController.getByGroup);

module.exports = router;

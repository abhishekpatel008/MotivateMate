const express = require('express');
const router = express.Router();
const { getTasks, createTask, getTask, updateTask, deleteTask, completeTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
router.route('/:id/complete').post(completeTask);

module.exports = router;
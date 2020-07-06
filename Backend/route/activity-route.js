const express = require('express');

const activityControllers = require('../controllers/activity-controller');

const router = express.Router();


router.get('/', activityControllers.getAllActivity);

router.post('/', activityControllers.createActivity);

router.patch('/:pid', activityControllers.updateActivity);

router.patch('/isComplete/:pid', activityControllers.updateActivityIsComplete);

router.delete('/:pid', activityControllers.deleteActivity);

module.exports = router;
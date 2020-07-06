const mongoose = require('mongoose')

const Activity = require('../models/activity');

const getAllActivity = async(req, res, next) => {
    let ac;
    try {
        ac = await Activity.find();
    } catch (err) {
        const error = new Error("could not find");
        return next(error);
    }
    res.json({ ac });
}
const createActivity = async(req, res, next) => {

    const { name, isComplete } = req.body;

    const createdActivity = new Activity({
        name,
        isComplete,
    });
    try {
        await createdActivity.save();
    } catch (err) {
        const error = new Error(
            'Creating Activity failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ Activity: createdActivity.toObject({ getters: true }) });
};
//update name
const updateActivity = async(req, res, next) => {
    const { name } = req.body;
    const ActivityId = req.params.pid;

    let ActivityUpdate;
    try {
        ActivityUpdate = await Activity.findById(ActivityId);
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not find a Activity.',
            500
        );
        return next(error);
    }

    ActivityUpdate.name = name;
    try {
        await ActivityUpdate.save();
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not update Activity.',
            500
        );
        return next(error);
    }

    res.status(200).json({ Activity: ActivityUpdate.toObject({ getters: true }) });
};
//upadate complete true/false
const updateActivityIsComplete = async(req, res, next) => {
    const { isComplete } = req.body;
    const ActivityId = req.params.pid;

    let ActivityUpdate;
    try {
        ActivityUpdate = await Activity.findById(ActivityId);
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not find a Activity.',
            500
        );
        return next(error);
    }

    ActivityUpdate.isComplete = isComplete;
    try {
        await ActivityUpdate.save();
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not update Activity.',
            500
        );
        return next(error);
    }

    res.status(200).json({ Activity: ActivityUpdate.toObject({ getters: true }) });
};
const deleteActivity = async(req, res, next) => {
    const ActivityId = req.params.pid;

    let ActivityDelete;
    try {
        ActivityDelete = await Activity.findById(ActivityId);
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not delete Activity.',
            500
        );
        return next(error);
    }

    if (!ActivityDelete) {
        const error = new Error('Could not find Activity for this id.', 404);
        return next(error);
    }

    try {
        await ActivityDelete.remove();
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not delete Activity.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted Activity.' });
};

exports.getAllActivity = getAllActivity;
exports.createActivity = createActivity;
exports.updateActivity = updateActivity;
exports.updateActivityIsComplete = updateActivityIsComplete;
exports.deleteActivity = deleteActivity;
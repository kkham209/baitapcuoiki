const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const activityRoutes = require('./route/activity-route');
const url = 'mongodb+srv://admin:a123456@cluster0.n23kr.mongodb.net/datatest?retryWrites=true&w=majority'
const app = express();

app.use(bodyParser.json());

app.use('/api/activity', activityRoutes);

app.use((req, res, next) => {
    const error = new Error('Could not find this route.', 404);
    next(error);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5001);
    })
    .catch(err => {
        console.log(err);
    });
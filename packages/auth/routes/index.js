'use strict'

const express = require('express');
const router = express.Router();
const authRouter = require('../routes/auth.route');

router.use("/auth", authRouter);

module.exports = (app) => {
    app.use('/login', authRouter);
}
'use strict'

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.changePasswordPassive);
router.post("/change-password", authController.changePasswordActive);

module.exports = router;
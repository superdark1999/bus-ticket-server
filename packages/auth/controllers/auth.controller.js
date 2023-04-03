'use strict'

const authService = require('../services/auth.service')

exports.register = async (req, res) => {
    try {
        const param = {
            enabled: true,
            credentials: [
                {
                    type: 'password',
                    value: req.body.password,
                    temporary: false
                }
            ],
            username: req.body.username,
            email: req.body.email,
            emailVerified: true,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }


        const result = await authService.register(param);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Interal Server Error' });
    }
}

exports.login = async (req, res) => {
    try {
        const param = {
            username: req.body.username,
            password: req.body.password,
        }
        const result = await authService.login(param);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

exports.logout = async (req, res) => {
    try {
        const result = await authService.logout(/*Add param */);
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500);
    }
};

/**
 * @description Change Password when user forgot password
 */
exports.changePasswordPassive = async (req, res) => {

    const result = await authService.changePasswordPassive(/*Add param */);
    return res.status(200).json({ data: result });
};

/**
 * @description Change Password when user using change password function
 */
exports.changePasswordActive = async (req, res) => {

    const result = await authService.changePasswordActive(/*Add param */);
    return res.status(200).json({ data: result });
};
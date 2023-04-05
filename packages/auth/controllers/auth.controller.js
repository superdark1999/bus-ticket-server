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

        return res.status(result.status).json({
            status: result.status,
            statusText: result.statusText,
            data: result.data,
        });
    } catch (error) {
        return res.status(error.response.status).json({
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const param = {
            username: req.body.username,
            password: req.body.password,
        }
        const result = await authService.login(param);

        return res.status(200).json({
            status: 200,
            statusText: 'Success',
            data: result,
        });
    } catch (error) {
        return res.status(401).json({
            status: 401,
            statusText: 'Unauthorized',
        });
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
    try {
        const param = {
            id_token: req.body.id_token,
            old_password: req.body.old_password,
            new_password: req.body.new_password,
        }

        const result = await authService.changePasswordActive(param);

        return res.status(result.status).json({
            status: result.status,
            statusText: result.statusText,
            data: result.data,
        })

    } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
            if ('invalid_grant' === error.response.data.error) {
                return res.status(error.response.status).json({
                    status: error.response.status,
                    statusText: 'Bad Request',
                    data: error.response.data,
                })
            }
        }

    }
};
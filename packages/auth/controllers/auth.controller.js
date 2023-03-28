import authService from "../services/auth.service"

const create = register(async (req, res) => {

    const result = await authService.register(/*Add param */);
    return res.status(200).json({ data: result });
});

const userLogin = login(async (req, res) => {

    const result = await authService.login(/*Add param */);
    return res.status(200).json({ data: result });
});

const userLogout = logout(async (req, res) => {

    const result = await authService.logout(/*Add param */);
    return res.status(200).json({ data: result });
});

/**
 * @description Change Password when user forgot password
 */
const userForgotPassword = changePasswordPassive(async (req, res) => {

    const result = await authService.changePasswordPassive(/*Add param */);
    return res.status(200).json({ data: result });
});

/**
 * @description Change Password when user using change password function
 */
const userChangePassword = changePasswordActive(async (req, res) => {

    const result = await authService.changePasswordActive(/*Add param */);
    return res.status(200).json({ data: result });
});

export const authController = {
    create, userLogin, userLogout, userForgotPassword, userChangePassword,
}
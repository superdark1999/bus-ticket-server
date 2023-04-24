'use strict'

const axios = require('axios');
const qs = require('node:querystring');
const jwt = require('jsonwebtoken');

const session = require('express-session');
const keycloak = require('keycloak-connect');

const MEMORY_STORE = new session.MemoryStore();
const KEY_CLOAK = new keycloak({ store: MEMORY_STORE });

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const REALM = process.env.REALM || master;
const CLIENT_ID = process.env.CLIENT_ID || 'bus-ticket-admin-client';
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'MR11mKaU67F8H71LLbHainSXHIQryhLZ';

exports.register = async (param) => {
    try {
        const tokenResponse = await axios.post(`${BASE_URL}/realms/${REALM}/protocol/openid-connect/token`, qs.stringify({
            grant_type: 'password',
            username: 'admin',
            password: '123456?a',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;
        const createUserResponse = await axios.post(`${BASE_URL}/admin/realms/${REALM}/users`, param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return createUserResponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.login = async (param) => {
    try {
        const grant = await KEY_CLOAK.grantManager.obtainDirectly(param.username, param.password)
        if (null === grant) {
            return;
        }
        const userInfo = await KEY_CLOAK.grantManager.userInfo(grant.access_token);

        const result = {
            access_token: grant.access_token.token,
            refresh_token: grant.refresh_token.token,
            id_token: grant.id_token.token,
            token_type: grant.token_type,
            expires_in: grant.expires_in,
            user_info: userInfo,
        }

        return result;

    } catch (error) {
        console.log(error)
        throw error;
    }
}

exports.logout = async (req, res) => {
    return '';
}

exports.changePasswordPassive = async (req, res) => {
    return '';
}

exports.changePasswordActive = async (param) => {
    try {
        const userInfo = jwt.decode(param.id_token);
        const userTokenResponse = await axios.post(`${BASE_URL}/realms/${REALM}/protocol/openid-connect/token`, qs.stringify({
            grant_type: 'password',
            username: userInfo.preferred_username,
            password: param.old_password,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const adminTokenResponse = await axios.post(`${BASE_URL}/realms/${REALM}/protocol/openid-connect/token`, qs.stringify({
            grant_type: 'password',
            username: 'admin',
            password: '123456?a',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const adminAccessToken = adminTokenResponse.data.access_token;
        const userId = userInfo.sub;
        const resetParam = {
            type: 'password',
            value: param.new_password,
            temporary: false
        }
        const resetPasswordResponse = await axios.put(`${BASE_URL}/admin/realms/${REALM}/users/${userId}/reset-password`, resetParam, {
            headers: {
                Authorization: `Bearer ${adminAccessToken}`
            }
        });

        return resetPasswordResponse;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
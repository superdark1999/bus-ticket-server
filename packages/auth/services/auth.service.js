'use strict'

const axios = require('axios');
const qs = require('node:querystring');
const jwt = require('jsonwebtoken');

const session = require('express-session');
const keycloak = require('keycloak-connect');

const MEMORY_STORE = new session.MemoryStore();
const KEY_CLOAK = new keycloak({ store: MEMORY_STORE });

exports.register = async (param) => {
    try {
        const tokenResponse = await axios.post('http://localhost:8180/realms/master/protocol/openid-connect/token', qs.stringify({
            grant_type: 'password',
            username: 'admin',
            password: 'admin',
            client_id: 'bus-ticket-server',
            client_secret: '3h8hKtybTzEBtlEkBtcsMBJyDPZTLNWr'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        const createUserResponse = await axios.post('http://localhost:8180/admin/realms/bus-ticket-auth-realm/users', param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return createUserResponse;
    } catch (error) {
        throw error;
    }
}

exports.login = async (param) => {
    try {
        const grant = await KEY_CLOAK.grantManager.obtainDirectly(param.username, param.password)
        if (null === grant) {
            return;
        }
        const result = {
            access_token: grant.access_token.token,
            refresh_token: grant.refresh_token.token,
            id_token: grant.id_token.token,
            token_type: grant.token_type,
            expires_in: grant.expires_in,
        }

        return result;

    } catch (error) {
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
        const userTokenResponse = await axios.post('http://localhost:8180/realms/bus-ticket-auth-realm/protocol/openid-connect/token', qs.stringify({
            grant_type: 'password',
            username: userInfo.preferred_username,
            password: param.old_password,
            client_id: 'bus-ticket-server',
            client_secret: '4UCFdrgGkqIS2mP3MevAFRLrs9j8jGOm'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const adminTokenResponse = await axios.post('http://localhost:8180/realms/master/protocol/openid-connect/token', qs.stringify({
            grant_type: 'password',
            username: 'admin',
            password: 'admin',
            client_id: 'bus-ticket-server',
            client_secret: '3h8hKtybTzEBtlEkBtcsMBJyDPZTLNWr'
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
        const resetPasswordResponse = await axios.put(`http://localhost:8180/admin/realms/bus-ticket-auth-realm/users/${userId}/reset-password`, resetParam, {
            headers: {
                Authorization: `Bearer ${adminAccessToken}`
            }
        });

        return resetPasswordResponse;
    } catch (error) {
        throw error;
    }
}
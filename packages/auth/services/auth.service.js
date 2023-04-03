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
        const tokenResponse = await axios.post('http://localhost:8080/realms/master/protocol/openid-connect/token', qs.stringify({
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

        const createUserResponse = await axios.post('http://localhost:8080/admin/realms/bus-ticket-auth-realm/users', param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return createUserResponse.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.login = async (param) => {
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
}

exports.logout = async (req, res) => {
    return '';
}

exports.changePasswordPassive = async (req, res) => {
    return '';
}

exports.changePasswordActive = async (req, res) => {
    return '';
}

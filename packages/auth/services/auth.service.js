import axios from "axios";
import qs from "node:querystring";
import jwt from "jsonwebtoken"

import session from "express-session"
import keycloak from "keycloak-connect"

const MEMORY_STORE = new session.MemoryStore();
const KEY_CLOAK = new keycloak({ store: MEMORY_STORE });

const register = async (param) => {
    try {
        const tokenResponse = await axios.post('http://localhost:8080/auth/realms/bus-ticket-auth-realm/protocol/openid-connect/token', qs.stringify({
            grant_type: 'password',
            username: 'admin',
            password: 'admin',
            client_id: 'bus-ticket-server',
            client_secret: '4UCFdrgGkqIS2mP3MevAFRLrs9j8jGOm'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const accessToken = tokenResponse.data.access_token;

        const createUserResponse = await axios.post('http://localhost:8080/auth/admin/realms/bus-ticket-auth-realm/users', param, {
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

const login = async (param) => {
    const grant = await KEY_CLOAK.grantManager.obtainDirectly(param.username, param.password);
    if (null === grant) {
        return null;
    }

    const userDecode = jwt.decode(grant.id_token);
    const result = {
        grant: grant,
        user: userDecode
    }
    return result;
}

const logout = async (req, res) => {
    return '';
}

const changePasswordPassive = async (req, res) => {
    return '';
}

const changePasswordActive = async (req, res) => {
    return '';
}

export default {
    register, login, logout, changePasswordActive, changePasswordPassive,
}
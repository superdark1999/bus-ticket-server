require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.route');
const keycloak = require('keycloak-connect');

const APP = express();
const PORT = process.env.PORT || 8084;
const MEMORY_STORE = new session.MemoryStore();
const KEY_CLOAK = new keycloak({ store: MEMORY_STORE });

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(authRouter);

APP.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

module.exports = APP;
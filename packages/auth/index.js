import express from "express"
import session from "express-session"
import routes from "./routes";
import keycloak from "keycloak-connect"
// import setup from "shared/lib/setup";

const APP = express();
const PORT = process.env.PORT || 8084;
const MEMORY_STORE = new session.MemoryStore();
const KEY_CLOAK = new keycloak({ store: MEMORY_STORE });

APP.get("/test-postman", (req, res) => {
    res.send({
        message: 'Test successfully',
    });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

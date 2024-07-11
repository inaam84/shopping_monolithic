const dotEnv = require('dotenv');

if(process.env.NODE_ENV !== 'production') {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    dotEnv.config();
}

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    APP_SERCRET: process.env.APP_SERCRET
};
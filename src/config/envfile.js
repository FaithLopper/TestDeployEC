require('dotenv').config()

const feEnv = {
    HOST: process.env.REACT_APP_HOST,
    RECAPTCHA_KEY: process.env.REACT_APP_RECAPTCHA_KEY

}

export default feEnv
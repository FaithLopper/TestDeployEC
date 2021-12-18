import { USER_CONSTANTS } from "../constants/userConstants"
import feEnv from "../config/envfile"
import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const { data } = await axios.post(`${feEnv.HOST}/v1/user/login`, { email, password }, config)


        dispatch({
            type: USER_CONSTANTS.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const logout = () => async (dispatch, getState) => {
    try {

        const { userLogin: { userInfo } } = getState()
        localStorage.removeItem("userInfo");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${feEnv.HOST}/v1/user/logout`, {}, config)

        dispatch({
            type: USER_CONSTANTS.USER_LOGOUT,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_LOGOUT,
            payload: error.response.data
        })
    }
}


export const register = (
    name, birth, isMale,
    personalIdNumber, phoneNumber,
    email, homeAddress, job) => async (dispatch) => {
        try {
            dispatch({
                type: USER_CONSTANTS.USER_REGISTER_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }


            const { data } = await axios.post(`${feEnv.HOST}/v1/user/register`,

                {
                    name, birth, isMale,
                    personalIdNumber, phoneNumber,
                    email, homeAddress, job
                }, config)

            dispatch({
                type: USER_CONSTANTS.USER_REGISTER_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: USER_CONSTANTS.USER_REGISTER_FAIL,
                payload: { status: error.response.status, messages: error.response.data }
            })
        }
    }

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_FORGOT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const { data } = await axios.post(`${feEnv.HOST}/v1/user/forgot-password`, { email }, config)

        dispatch({
            type: USER_CONSTANTS.USER_FORGOT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_FORGOT_FAIL,
            payload: { status: error.response.status, messages: error.response.data }
        })
    }
}

export const userUpForgot = (forgotToken, forgotType, newPass, conNewPass) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_FORGOT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let body = {}

        if (forgotType === 'verify') {
            body = {
                token: forgotToken
            }
        }
        else {
            body = {
                newPassword: newPass,
                confirmNewPassword: conNewPass,
                token: forgotToken
            }
        }

        const { data } = await axios.post(`${feEnv.HOST}/v1/user/forgot-password/${forgotType}`, body, config)

        dispatch({
            type: USER_CONSTANTS.USER_FORGOT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_FORGOT_FAIL,
            payload: { status: error.response.status, messages: error.response.data }
        })
    }
}

export const getUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${feEnv.HOST}/v1/user/profile`, config)

        dispatch({
            type: USER_CONSTANTS.USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_DETAILS_FAIL,
            payload: error.response.data
        })
    }
}


export const userUpPass = (curPass, newPass, ConNewPass) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_UPDATE_PASS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        let body = {
            currentPassword: curPass,
            newPassword: newPass,
            confirmNewPassword: ConNewPass
        }

        const { data } = await axios.put(`${feEnv.HOST}/v1/user/profile`, body, config)

        dispatch({
            type: USER_CONSTANTS.USER_UPDATE_PASS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_UPDATE_PASS_FAIL,
            payload: { status: error.response.status, messages: error.response.data }
        })
    }
}


export const getPayment = (amountNumber) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_GET_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const totalAmount = {
            amount: amountNumber
        }

        const { data } = await axios.post(`${feEnv.HOST}/v1/user/charge`, totalAmount, config)

        dispatch({
            type: USER_CONSTANTS.USER_GET_PAYMENT_SUCCESS,
            payload: data
        })
        window.open(data.url, '_parent')

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_GET_PAYMENT_FAIL,
            payload: error.response.data
        })
    }
}

export const submitPayment = (paymentId, PayerID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_SUB_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const body = {
            paymentId, PayerID
        }
        const { data } = await axios.post(`${feEnv.HOST}/v1/user/charge/submit`, body, config)

        dispatch({
            type: USER_CONSTANTS.USER_SUB_PAYMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_SUB_PAYMENT_FAIL,
            payload: error.response.data
        })
    }
}

export const init_DT_Service = (amountNumber, services, perInfo) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_DT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        let body = {}

        if (services === 'withdraw-money') {

            body = {
                amount: amountNumber,
                emailPayPal: perInfo
            }
        }
        else {
            body = {
                amount: amountNumber,
                accNumber: perInfo
            }
        }

        const { data } = await axios.post(`${feEnv.HOST}/v1/user/${services}`, body, config)

        dispatch({
            type: USER_CONSTANTS.USER_DT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_DT_FAIL,
            payload: error.response.data
        })
    }
}

export const verify_DT_Service = (servicesToken, services, type) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONSTANTS.USER_DT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const body = {
            token: servicesToken,
        }
        const { data } = await axios.post(`${feEnv.HOST}/v1/user/${services}/${type}`, body, config)

        dispatch({
            type: USER_CONSTANTS.USER_DT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CONSTANTS.USER_DT_FAIL,
            payload: error.response.data
        })
    }
}

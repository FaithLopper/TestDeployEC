import { ADMIN_CONSTANTS } from "../constants/adminConstant"
import feEnv from "../config/envfile"
import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type:  ADMIN_CONSTANTS.ADMIN_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const { data } = await axios.post(`${feEnv.HOST}/v2/admin/login`, { email, password }, config)


        dispatch({
            type:  ADMIN_CONSTANTS.ADMIN_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('adminInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:  ADMIN_CONSTANTS.ADMIN_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("adminInfo");
        dispatch({
            type:  ADMIN_CONSTANTS.ADMIN_LOGIN_SUCCESS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type:  ADMIN_CONSTANTS.ADMIN_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const profile=()=>async (dispatch,getState)=>{

    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PROFILE_REQUEST
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v2/admin/profile`, config)
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PROFILE_FAIL,
            payload: error.response.data
        })
    }
}

export const updateProfile=(user)=>async (dispatch,getState)=>{

    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_UPDATE_REQUEST
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const { data } = await axios.put(`${feEnv.HOST}/v2/admin/profile`,user, config)
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_UPDATE_FAIL,
            payload: error.response.data
        })
    }
}

export const updatePassword=(password)=>async (dispatch,getState)=>{

    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PASSWORD_REQUEST
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const { data } = await axios.put(`${feEnv.HOST}/v2/admin/password`,password, config)
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}
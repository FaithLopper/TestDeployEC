import { USER_CONSTANTS } from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_LOGIN_REQUEST: return { loading: true }
        case USER_CONSTANTS.USER_LOGIN_SUCCESS: return { loading: false, userInfo: action.payload }
        case USER_CONSTANTS.USER_LOGIN_FAIL: return { loading: false, error: action.payload }
        case USER_CONSTANTS.USER_LOGOUT: return { messages: action.payload }
        default: return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_REGISTER_REQUEST: return { loading: true }
        case USER_CONSTANTS.USER_REGISTER_SUCCESS: return { loading: false, successRes: action.payload } //, userInfo: action.payload
        case USER_CONSTANTS.USER_REGISTER_FAIL: return { loading: false, errorRes: action.payload }
        default: return state
    }
}

export const userForgotPassReducer = (state = { resMessage: {} }, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_FORGOT_REQUEST: return { ...state, loading: true }
        case USER_CONSTANTS.USER_FORGOT_SUCCESS: return { loading: false, resMessage: action.payload, success: true } //, userInfo: action.payload
        case USER_CONSTANTS.USER_FORGOT_FAIL: return { loading: false, resMessage: action.payload, success: false }
        case USER_CONSTANTS.USER_FORGOT_RESET: return {}
        default: return state
    }
}


export const userProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_DETAILS_REQUEST: return { ...state, loading: true }
        case USER_CONSTANTS.USER_DETAILS_SUCCESS: return { loading: false, user: action.payload, error: false }
        case USER_CONSTANTS.USER_DETAILS_FAIL: return { loading: false, user: action.payload, error: true }
        default: return state
    }
}

export const userUpdatePassReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_UPDATE_PASS_REQUEST: return { loading: true }
        case USER_CONSTANTS.USER_UPDATE_PASS_SUCCESS: return { loading: false, successRes: action.payload }
        case USER_CONSTANTS.USER_UPDATE_PASS_FAIL: return { loading: false, errorRes: action.payload }
        default: return state
    }
}

export const userGetPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_GET_PAYMENT_REQUEST: return { loading: true }
        case USER_CONSTANTS.USER_GET_PAYMENT_SUCCESS: return { loading: false, info: action.payload }
        case USER_CONSTANTS.USER_GET_PAYMENT_FAIL: return { loading: false, error: action.payload }
        default: return state
    }
}

export const userSubPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_SUB_PAYMENT_REQUEST: return { loading: true }
        case USER_CONSTANTS.USER_SUB_PAYMENT_SUCCESS: return { loading: false, successRes: action.payload }
        case USER_CONSTANTS.USER_SUB_PAYMENT_FAIL: return { loading: false, errorRes: action.payload }
        default: return state
    }
}

export const user_DT_Reducer = (state = { res: {} }, action) => {
    switch (action.type) {
        case USER_CONSTANTS.USER_DT_REQUEST: return { ...state, loading: true }
        case USER_CONSTANTS.USER_DT_SUCCESS: return { loading: false, res: action.payload, errorRes: false }
        case USER_CONSTANTS.USER_DT_FAIL: return { loading: false, res: action.payload, errorRes: true }
        default: return state
    }
}
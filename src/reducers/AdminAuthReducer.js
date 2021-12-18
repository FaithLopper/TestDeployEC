import { ADMIN_CONSTANTS } from "../constants/adminConstant"

export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_LOGIN_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_LOGIN_SUCCESS: return { loading: false, adminInfo: action.payload }
        case ADMIN_CONSTANTS.ADMIN_LOGIN_FAIL: return { loading: false, error: action.payload }
        default: return state
    }
}
export const adminProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_PROFILE_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_PROFILE_SUCCESS: return { loading: false, adminProfile: action.payload,error:null }
        case ADMIN_CONSTANTS.ADMIN_PROFILE_FAIL: return { loading: false, error: action.payload,adminProfile:null }
        default: return state
    }
}

export const adminUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_UPDATE_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_UPDATE_SUCCESS: return { loading: false, noti: action.payload,error:null }
        case ADMIN_CONSTANTS.ADMIN_UPDATE_FAIL: return { loading: false, error: action.payload,noti:null }
        default: return state
    }
}

export const adminPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_PASSWORD_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_PASSWORD_SUCCESS: return { loading: false, notiPass: action.payload,errorPass:null }
        case ADMIN_CONSTANTS.ADMIN_PASSWORD_FAIL: return { loading: false, errorPass: action.payload,notiPass:null }
        default: return state
    }
}


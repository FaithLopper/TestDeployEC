import { ADMIN_CONSTANTS } from "../constants/adminConstant"

export const adminControlUser = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_GET_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_GET_SUCCESS: return { loading: false, listUser: action.payload,error:null }
        case ADMIN_CONSTANTS.ADMIN_GET_FAIL: return { loading: false, error: action.payload,listUser:null }
        default: return state
    }
}



export const adminControlUserDetail = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_DETAIL_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_DETAIL_SUCCESS: return { loading: false, userDetail: action.payload,error:null }
        case ADMIN_CONSTANTS.ADMIN_DETAIL_FAIL: return { loading: false, error: action.payload,userDetail:null }
        default: return state
    }
}


export const adminControlUserUpdate = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_PUT_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_PUT_SUCCESS: return { loading: false, noti: action.payload,error:null }
        case ADMIN_CONSTANTS.ADMIN_PUT_FAIL: return { loading: false, error: action.payload,noti:null }
        default: return state
    }
}


export const adminControlUserTransaction = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_TRANS_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_TRANS_SUCCESS: return { loading: false, userTrans: action.payload,error:null }
        case ADMIN_CONSTANTS.ADMIN_TRANS_FAIL: return { loading: false, error: action.payload,userTrans:null }
        default: return state
    }
}


export const adminCardCreate = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_CARD_CREATE_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_CARD_CREATE_SUCCESS: return { loading: false, notiCard: action.payload,errorCard:null }
        case ADMIN_CONSTANTS.ADMIN_CARD_CREATE_FAIL: return { loading: false, errorCard: action.payload,notiCard:null }
        default: return state
    }
}

export const adminCardNew = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_CARD_NEW_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_CARD_NEW_SUCCESS: return { loading: false, notiCardNew: action.payload,errorCardNew:null }
        case ADMIN_CONSTANTS.ADMIN_CARD_NEW_FAIL: return { loading: false, errorCardNew: action.payload,notiCardNew:null }
        default: return state
    }
}

export const adminCardView = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_CARD_VIEW_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_CARD_VIEW_SUCCESS: return { loading: false, adminCard: action.payload,errorCardAll:null }
        case ADMIN_CONSTANTS.ADMIN_CARD_VIEW_FAIL: return { loading: false, errorCardAll: action.payload, adminCard:null }
        default: return state
    }
}

export const adminCardSearch = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_CARD_SEARCH_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_CARD_SEARCH_SUCCESS: return { loading: false, adminCardSearch: action.payload,errorCardSearch:null }
        case ADMIN_CONSTANTS.ADMIN_CARD_SEARCH_FAIL: return { loading: false, errorCardSearch: action.payload, adminCardSearch:null }
        default: return state
    }
}

export const adminCardUpdate = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_CARD_UPDATE_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_CARD_UPDATE_SUCCESS: return { loading: false, adminCardUpdate: action.payload,errorCardUpdate:null }
        case ADMIN_CONSTANTS.ADMIN_CARD_UPDATE_FAIL: return { loading: false, errorCardUpdate: action.payload, adminCardUpdate:null }
        default: return state
    }
}

export const adminOrderAll = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_ORDER_ALL_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_ORDER_ALL_SUCCESS: return { loading: false, adminOrderAll: action.payload,errorOrderAll:null }
        case ADMIN_CONSTANTS.ADMIN_ORDER_ALL_FAIL: return { loading: false, errorOrderAll: action.payload, adminOrderAll:null }
        default: return state
    }
}


export const adminOrderDetail= (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_ORDER_DETAIL_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_ORDER_DETAIL_SUCCESS: return { loading: false, adminOrderDetail: action.payload,errorOrderDetail:null }
        case ADMIN_CONSTANTS.ADMIN_ORDER_DETAIL_FAIL: return { loading: false, errorOrderDetail: action.payload, adminOrderDetail:null }
        default: return state
    }
}

export const adminOrderApprove= (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_ORDER_APPROVE_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_ORDER_APPROVE_SUCCESS: return { loading: false, adminOrderApprove: action.payload,errorOrderApprove:null }
        case ADMIN_CONSTANTS.ADMIN_ORDER_APPROVE_FAIL: return { loading: false, errorOrderApprove: action.payload, adminOrderApprove:null }
        default: return state
    }
}

export const adminOrderDeny= (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONSTANTS.ADMIN_ORDER_DENY_REQUEST: return { loading: true }
        case ADMIN_CONSTANTS.ADMIN_ORDER_DENY_SUCCESS: return { loading: false, adminOrderDeny: action.payload,errorOrderDeny:null }
        case ADMIN_CONSTANTS.ADMIN_ORDER_DENY_FAIL: return { loading: false, errorOrderDeny: action.payload, adminOrderDeny:null }
        default: return state
    }
}




import { TRANSACTION_CONSTANTS } from "../constants/managermentConstant"
import { CARD_CONSTANTS } from "../constants/managermentConstant"
import { PAYMENTGATE_CONSTANTS } from "../constants/managermentConstant"


export const getAllTransaction = (state = {}, action) => {
    switch (action.type) {
        case TRANSACTION_CONSTANTS.TRANSACTION_ALL_REQUEST: return { loading: true }
        case TRANSACTION_CONSTANTS.TRANSACTION_ALL_SUCCESS: return { loading: false, listTrans: action.payload,errorTrans:null }
        case TRANSACTION_CONSTANTS.TRANSACTION_ALL_FAIL: return { loading: false, errorTrans: action.payload,listTrans:null }
        default: return state
    }
}


export const getDetailTransaction = (state = {}, action) => {
    switch (action.type) {
        case TRANSACTION_CONSTANTS.TRANSACTION_DETAIL_REQUEST: return { loading: true }
        case TRANSACTION_CONSTANTS.TRANSACTION_DETAIL_SUCCESS: return { loading: false, detailTrans: action.payload,errorDetailTrans:null }
        case TRANSACTION_CONSTANTS.TRANSACTION_DETAIL_FAIL: return { loading: false, errorDetailTrans: action.payload,detailTrans:null }
        default: return state
    }
}

export const getAllCard = (state = {}, action) => {
    switch (action.type) {
        case CARD_CONSTANTS.CARD_ALL_REQUEST: return { loading: true }
        case CARD_CONSTANTS.CARD_ALL_SUCCESS: return { loading: false, allCard: action.payload,errorAllCard:null }
        case CARD_CONSTANTS.CARD_ALL_FAIL: return { loading: false, errorAllCard: action.payload,allCard:null }
        default: return state
    }
}

export const activeCard = (state = {}, action) => {
    switch (action.type) {
        case CARD_CONSTANTS.CARD_ACTIVE_REQUEST: return { loading: true }
        case CARD_CONSTANTS.CARD_ACTIVE_SUCCESS: return { loading: false, activeCard: action.payload,errorActiveCard:null }
        case CARD_CONSTANTS.CARD_ACTIVE_FAIL: return { loading: false, errorActiveCard: action.payload,activeCard:null }
        default: return state
    }
}


export const deactiveCard = (state = {}, action) => {
    switch (action.type) {
        case CARD_CONSTANTS.CARD_DEACTIVE_REQUEST: return { loading: true }
        case CARD_CONSTANTS.CARD_DEACTIVE_SUCCESS: return { loading: false, deactiveCard: action.payload,errorDeactiveCard:null }
        case CARD_CONSTANTS.CARD_DEACTIVE_FAIL: return { loading: false, errorDeactiveCard: action.payload,deactiveCard:null }
        default: return state
    }
}

export const getAllPaymentgate= (state = {}, action) => {
    switch (action.type) {
        case PAYMENTGATE_CONSTANTS.PAYMENTGATE_ALL_REQUEST: return { loading: true }
        case PAYMENTGATE_CONSTANTS.PAYMENTGATE_ALL_SUCCESS: return { loading: false, allPaymentgate: action.payload,errorAllPaymentgate:null }
        case PAYMENTGATE_CONSTANTS.PAYMENTGATE_ALL_FAIL: return { loading: false, errorAllPaymentgate: action.payload,allPaymentgate:null }
        default: return state
    }
}



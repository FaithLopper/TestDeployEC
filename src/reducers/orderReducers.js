import { ORDER_CONSTANTS } from "../constants/orderConstant"

export const initializeOrderReducer = (state = { res: {} }, action) => {
    switch (action.type) {
        case ORDER_CONSTANTS.ORDER_INIT_REQUEST: return { ...state, loading: true }
        case ORDER_CONSTANTS.ORDER_INIT_SUCCESS: return { loading: false, res: action.payload, success: true }
        case ORDER_CONSTANTS.ORDER_INIT_FAIL: return { loading: false, res: action.payload, success: false }
        case ORDER_CONSTANTS.ORDER_INIT_RESET: return { res: {} }
        default: return state
    }
}
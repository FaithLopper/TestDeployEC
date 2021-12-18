import { CARD_LIST_FAIL, CARD_LIST_SUCCESS, CARD_LIST_REQUEST } from '../constants/cardConstant'
import { CARD_DETAIL_FAIL, CARD_DETAIL_SUCCESS, CARD_DETAIL_REQUEST } from '../constants/cardConstant'


export const cardListReducer = (state = { cards: {} }, action) => {
    switch (action.type) {
        case CARD_LIST_REQUEST:
            return {
                loading: true,
                cards: {}
            }
        case CARD_LIST_SUCCESS:
            return {
                loading: false,

                cards: action.payload,


            }
        case CARD_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const cardDetailReducer = (state = { card: {} }, action) => {
    switch (action.type) {
        case CARD_DETAIL_REQUEST:
            return {
                loading: true,
                card: {}
            }
        case CARD_DETAIL_SUCCESS:
            return {
                loading: false,
                card: action.payload,
            }
        case CARD_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
                card: {}
            }
        default:
            return state
    }
}
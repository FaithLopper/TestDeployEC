import { TRANSACTION_CONSTANTS } from "../constants/managermentConstant"
import { CARD_CONSTANTS } from "../constants/managermentConstant"
import { PAYMENTGATE_CONSTANTS } from "../constants/managermentConstant"

import feEnv from "../config/envfile"
import axios from 'axios'




export const allTransaction = (page) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_CONSTANTS.TRANSACTION_ALL_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v1/transaction-logs/logs?page=${page}`,config)

        dispatch({
            type: TRANSACTION_CONSTANTS.TRANSACTION_ALL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TRANSACTION_CONSTANTS.TRANSACTION_ALL_FAIL,
            payload: error.response.data
        })
    }
}


export const detailTransaction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_CONSTANTS.TRANSACTION_DETAIL_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v1/transaction-logs/log?_id=${id}`,config)

        dispatch({
            type: TRANSACTION_CONSTANTS.TRANSACTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TRANSACTION_CONSTANTS.TRANSACTION_DETAIL_FAIL,
            payload: error.response.data
        })
    }
}

export const getAllCard = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CARD_CONSTANTS.CARD_ALL_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v1/cards/all-cards`,config)

        dispatch({
            type: CARD_CONSTANTS.CARD_ALL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CARD_CONSTANTS.CARD_ALL_FAIL,
            payload: error.response.data
        })
    }
}

export const activeCardAction = (cardId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CARD_CONSTANTS.CARD_ACTIVE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        let obj={
            cardId:cardId,
        }
        const { data } = await axios.put(`${feEnv.HOST}/v1/cards/active`,obj,config)
    

        dispatch({
            type: CARD_CONSTANTS.CARD_ACTIVE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CARD_CONSTANTS.CARD_ACTIVE_FAIL,
            payload: error.response.data
        })
    }
}
  
export const deactiveCardAction= (cardId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CARD_CONSTANTS.CARD_DEACTIVE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(cardId)
        let obj={
            cardId:cardId,
        }
       
        const { data } = await axios.put(`${feEnv.HOST}/v1/cards/deactive`,obj,config)
        dispatch({
            type: CARD_CONSTANTS.CARD_DEACTIVE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CARD_CONSTANTS.CARD_DEACTIVE_FAIL,
            payload: error.response.data
        })
    }
}
  
  
export const allPaymentGate= () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENTGATE_CONSTANTS.PAYMENTGATE_ALL_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v1/gateways/all-gateways`,config)

        dispatch({
            type: PAYMENTGATE_CONSTANTS.PAYMENTGATE_ALL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PAYMENTGATE_CONSTANTS.PAYMENTGATE_ALL_FAIL,
            payload: error.response.data
        })
    }
}
  
  
   
  
  
  
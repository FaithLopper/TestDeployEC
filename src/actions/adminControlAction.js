
import {ADMIN_CONSTANTS} from "../constants/adminConstant"
import feEnv from "../config/envfile"
import axios from 'axios'
export const getAllUserInfo = (page) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_GET_REQUEST
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v2/users/all-users?page=${page}`, config)
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_GET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_GET_FAIL,
            payload: error.response.data
        })
    }
}


export const getDetailUserInfo = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_DETAIL_REQUEST
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get(`${feEnv.HOST}/v2/users/user/details?_id=${id}`, config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_DETAIL_FAIL,
            payload: error.response.data
        })
    }
}



export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PUT_REQUEST
        })
        console.log(user);
        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.put(`${feEnv.HOST}/v2/users/user/details`,user,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PUT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_PUT_FAIL,
            payload: error.response.data
        })
    }
}


export const getUserTransactionLog = (id,page) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_TRANS_REQUEST
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get(`${feEnv.HOST}/v2/users/user/transaction-logs?_id=${id}&page=${page}`, config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_TRANS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_TRANS_FAIL,
            payload: error.response.data
        })
    }
}

export const getSearchlUserInfo = (property,keyword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_GET_REQUEST
        })


        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        
        const { data } = await axios.get(`${feEnv.HOST}/v2/users/user-search?property=${property}&keyword=${keyword}`, config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_GET_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_GET_FAIL,
            payload: error.response.data
        })
    }
}


export const createCard = (type,card) => async (dispatch, getState) => {
    try {

        switch(type){
            case "intCredits": 
            delete card.maxPay
            break
            case "intDebits": 
            delete card.creditLine
            delete card.condition
            delete card.payWithin
            delete card.interestRate
            break
            case "domDebits": 
            delete card.maxPay
            delete card.creditLine
            delete card.condition
            delete card.payWithin
            delete card.interestRate
            delete card.exCurrency
            break
            default: return card
        }
        console.log(card)
      

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_CREATE_REQUEST
        })
        

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
      
        const { data } = await axios.post(`${feEnv.HOST}/v2/card-type/${type}`,card,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_CREATE_FAIL,
            payload: error.response.data
        })
    }
}


export const viewCard = (type) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_VIEW_REQUEST
        })
     

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
      
        const { data } = await axios.get(`${feEnv.HOST}/v2/card-type/${type}`,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_VIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_VIEW_FAIL,
            payload: error.response.data
        })
    }
}

export const searchCard = (type,cardUrl) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_SEARCH_REQUEST
        })
      

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
      
        const { data } = await axios.get(`${feEnv.HOST}/v2/card-type/${type}/${cardUrl}`,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_SEARCH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_SEARCH_FAIL,
            payload: error.response.data
        })
    }
}


export const updateCard = (type,card) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_UPDATE_REQUEST
        })
 

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
      
        const { data } = await axios.put(`${feEnv.HOST}/v2/card-type/${type}`,card,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_CARD_UPDATE_FAIL,
            payload: error.response.data
        })
    }
}

export const allOrder = (page) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_ALL_REQUEST
        })


        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
      
        const { data } = await axios.get(`${feEnv.HOST}/v2/orders/all-order?page=${page}`,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_ALL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_ALL_FAIL,
            payload: error.response.data
        })
    }
}


export const getDetailOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_DETAIL_REQUEST
        })
 

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const { data } = await axios.get(`${feEnv.HOST}/v2/orders/order/details?orderId=${id}`,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_DETAIL_FAIL,
            payload: error.response.data
        })
    }
}

export const approveOrder = (id,cmt) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_APPROVE_REQUEST
        })
 

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const order=
            {
                orderId: id,
                bankCmt: cmt
            }
        
        const { data } = await axios.post(`${feEnv.HOST}/v2/orders/order/approve`,order,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_APPROVE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_APPROVE_FAIL,
            payload: error.response.data
        })
    }
}

export const denyOrder = (id,cmt) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_DENY_REQUEST
        })
 

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const order=
            {
                orderId: id,
                bankCmt: cmt
            }
        
        const { data } = await axios.post(`${feEnv.HOST}/v2/orders/order/deny`,order,config)

        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_DENY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONSTANTS.ADMIN_ORDER_DENY_FAIL,
            payload: error.response.data
        })
    }
}
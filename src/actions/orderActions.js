import { ORDER_CONSTANTS } from "../constants/orderConstant"
import feEnv from "../config/envfile"
import axios from 'axios'


export const initOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_CONSTANTS.ORDER_INIT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        let body = {}

        if (order.orderType === 'card-init') {

            body = {
                cardTypeId: order.cardTypeId,
                cardType: order.cardTypeFixed,
                cusCmt: order.cusCmt
            }
        }
        else if (order.orderType === 'card-cancel') {
            body = {
                cardId: order.cardId,
                cusCmt: order.cusCmt
            }
        }
        else if (order.orderType === 'paymentgateway-init') {
            body = {
                globalGate: order.globalGate,
                cusCmt: order.cusCmt
            }
        }
        else if (order.orderType === 'paymentgateway-cancel') {
            body = {
                cardId: order.cardId,
                gateId: order.gateId
            }
        }

        const { data } = await axios.post(`${feEnv.HOST}/v1/order/${order.orderType}`, body, config)

        dispatch({
            type: ORDER_CONSTANTS.ORDER_INIT_SUCCESS,
            payload: data
        })

        setTimeout(function () {
            dispatch({
                type: ORDER_CONSTANTS.ORDER_INIT_RESET,
            });
        }, 15000);

    } catch (error) {
        dispatch({
            type: ORDER_CONSTANTS.ORDER_INIT_FAIL,
            payload: error.response.data
        })
        setTimeout(function () {
            dispatch({
                type: ORDER_CONSTANTS.ORDER_INIT_RESET,
            });
        }, 15000);
    }
}
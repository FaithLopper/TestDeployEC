import React, { useState } from 'react'
import { Paypal, CurrencyExchange } from 'react-bootstrap-icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getPayment } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from './Loader'

const ChargeTab = () => {

    const dispatch = useDispatch()
    const [amountNumber, setAmountNumber] = useState(5)

    const userGetPayment = useSelector(state => state.userGetPayment)
    const { loading } = userGetPayment
    const [toVND, setToVND] = useState(0)
    const [exchangerate, setexChangerate] = useState(0)

    const exCurrency = async () => {
        if (exchangerate === 0) {
            const { data } = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
            setexChangerate(data.rates.VND)
            setToVND((data.rates.VND * amountNumber).toFixed(2))
        }
        else {
            setToVND((exchangerate * amountNumber).toFixed(2))
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getPayment(amountNumber))
    }


    return (
        <Form id='charge' onSubmit={e => submitHandler(e)} >
            <h2>Nạp Tiền</h2>
            <Form.Group as={Col} controlId="fullname">
                <Form.Label style={{ color: 'gold' }}  >Nhập số dư xử lý giao dịch (Tối thiểu $5)</Form.Label>
                <Form.Control required type="number" min='5' value={amountNumber} onChange={e => setAmountNumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="excurrency">
                <Form.Label style={{ color: 'gold' }}  >Quy đổi VNĐ (Chưa tính phí)</Form.Label>
                <Row>
                    <Col>
                        <Form.Control value={toVND} type="number" disabled={true} />
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: 'darkturquoise', width: '100%' }}
                            onClick={exCurrency}><CurrencyExchange size={25} /> Quy đổi</Button>
                    </Col>
                </Row>
            </Form.Group>

            <Button form='charge' type='submit' className='my-3' style={{ backgroundColor: 'dodgerblue', width: '100%' }}><Paypal size={25} /> Xử lý </Button>

            {loading && <Loader />}
        </Form>
    )
}

export default ChargeTab

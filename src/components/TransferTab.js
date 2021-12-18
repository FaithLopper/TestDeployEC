import React, { useState } from 'react'
import { Translate } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { init_DT_Service } from '../actions/userActions'
import { Form, Button, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from '../components/Message'

const TransferTab = () => {

    const dispatch = useDispatch()
    const [amountNumber, setAmountNumber] = useState(50000)


    const user_DT_services = useSelector(state => state.user_DT_services)
    const { loading, res } = user_DT_services

    const [accNumber, setAccNumber] = useState('')


    const transferHandler = (e) => {
        e.preventDefault()
        dispatch(init_DT_Service(amountNumber, 'transfer', accNumber))
    }


    return (
        <Form onSubmit={e => transferHandler(e)}>
            <h2>Chuyển Khoản</h2>
            <Form.Group as={Col} controlId="amount">
                <Form.Label style={{ color: 'gold' }}  >Nhập số dư (50,000 ~ 5,000,000 VNĐ / 1 lần)</Form.Label>
                <Form.Control required type="number" min='50000' max='5000000' value={amountNumber} onChange={e => setAmountNumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="accNumber">
                <Form.Label style={{ color: 'gold' }}  >Nhập số tài khoản</Form.Label>
                <Form.Control required type="number" value={accNumber} onChange={e => setAccNumber(e.target.value)}
                />
            </Form.Group>

            <Button type='submit' className='my-3' style={{ backgroundColor: 'dodgerblue', width: '100%' }}><Translate size={25} /> Xử lý </Button>

            {loading && <Loader />}
            {res.message && <Message variant='info'>{res.message}</Message>}
        </Form>
    )
}

export default TransferTab

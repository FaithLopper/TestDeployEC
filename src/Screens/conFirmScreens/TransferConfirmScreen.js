import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Alert, Row, Col, Form } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { verify_DT_Service } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'


const TransferConfirmScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const curURL = useLocation().search;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const token = new URLSearchParams(curURL).get('token');
    const uId = new URLSearchParams(curURL).get('uid');

    const user_DT_services = useSelector(state => state.user_DT_services)
    const { loading, res, errorRes } = user_DT_services

    const [accNumber, setAccNumber] = useState('')
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState('')

    useEffect(() => {
        if (!userInfo || !uId || !token) {
            navigate('/login')
        }
        else {
            if (Object.keys(res).length === 0) {
                dispatch(verify_DT_Service(token, 'transfer', 'verify'))
            }
            else if (!errorRes) {
                setAccNumber(res.receiverAccNumber)
                setAmount(res.amount)
                setCurrency(res.currency)
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, token, res, userInfo])



    //123QWe!@# minhpatmail@gmail.com

    const submitHandler = (e) => {
        e.preventDefault() //dispatch
        dispatch(verify_DT_Service(token, 'transfer', 'submit'))

    }
    return (
        <FormContainer style={{ marginTop: 110 }}>
            {(res.message && !errorRes) && (<Alert className='justify-content-center' variant='success'>{res.message}&#160;&#160;&#160;
                <Alert.Link href="/">Trở về trang chủ </Alert.Link></Alert>)}
            {errorRes && < Alert className='justify-content-center' variant='danger'>{res.message}&#160;&#160;&#160;
                <Alert.Link href="/">Trở về trang chủ </Alert.Link></Alert>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Form.Group controlId='emailPayPal'>
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control disabled type='text' placeholder='email PayPal' required
                            value={accNumber} onChange={e => setAccNumber(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control disabled type='number' placeholder='amount' required
                            value={amount} onChange={e => setAmount(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId='currency'>
                        <Form.Label>Currency</Form.Label>
                        <Form.Control disabled type='text' placeholder='currency' required
                            value={currency} onChange={e => setCurrency(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Button type='submit' className='mt-3' >Confirm Transfer</Button>
            </Form>
        </FormContainer >
    )
}

export default TransferConfirmScreen;

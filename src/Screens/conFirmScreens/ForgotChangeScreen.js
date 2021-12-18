import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Alert, Row, Col, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import Loader from '../../components/Loader'
import { userUpForgot } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'


const ForgotChangeScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const curURL = useLocation().search;

    const token = new URLSearchParams(curURL).get('token');
    const uId = new URLSearchParams(curURL).get('uid');

    const userForgotPass = useSelector(state => state.userForgotPass)
    const { loading, resMessage, success } = userForgotPass

    const [newPass, setNewPass] = useState('')
    const [conNewPass, setConNewPass] = useState('')


    useEffect(() => {
        if (!uId || !token) {
            navigate('/login')
        }
        else {
            if (Object.keys(resMessage).length === 0) {
                dispatch(userUpForgot(token, 'verify', newPass, conNewPass))
            }
            else {
                console.log('test')
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, token, resMessage])



    //123QWe!@# minhpatmail@gmail.com

    const submitHandler = (e) => {
        e.preventDefault() //dispatch
        dispatch(userUpForgot(token, 'submit', newPass, conNewPass))

    }
    return (
        <FormContainer style={{ marginTop: 110 }}>
            {(success === true && resMessage.message) && (<Alert className='justify-content-center' variant='success'>{resMessage.message}&#160;&#160;&#160;
                <Alert.Link href="/">Trở về trang chủ </Alert.Link></Alert>)}

            {success === false && resMessage.status === 422
                && (< Alert className='justify-content-center' variant='danger'>
                    {resMessage.messages.errors.map(e => e.msg).join(', ')}&#160;</Alert>)}
            {success === false && resMessage.status === 401
                && (< Alert className='justify-content-center' variant='danger'>
                    {resMessage.messages.message}&#160;</Alert>)}

            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Form.Group as={Col} controlId='newPassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type='password' placeholder='newPassword' required
                            value={newPass} onChange={e => setNewPass(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId='conNewPassword'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type='password' placeholder='conNewPassword' required
                            value={conNewPass} onChange={e => setConNewPass(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                </Row>


                <Button type='submit' className='mt-3' >Change Password</Button>
            </Form>
        </FormContainer >
    )
}

export default ForgotChangeScreen;

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const LoginScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo, messages } = userLogin

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault() //dispatch login
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 style={{ color: 'lightyellow', textAlign: 'center', marginBottom: 30 }}>LOGIN</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {messages && <Message variant='danger'>Tài khoản hết hạn đăng nhập, vui lòng đăng nhập lại</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Account Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter Account Email'
                        value={email} onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password'
                        value={password} onChange={e => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Row className="py-4">
                    <Link to="/login/forgot" style={{ textDecoration: 'none' }}>
                        <p style={{ color: "red", fontSize: "15px" }}>Forgot password ?</p>
                    </Link>
                    <Col>
                        <Button type='submit' >Sign In</Button>
                    </Col>
                    <Col>
                        <Link to={'/register'}>New customer sign up here ?&#160;</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    )
}

export default LoginScreen;

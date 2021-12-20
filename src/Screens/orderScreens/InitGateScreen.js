import React, { useEffect, useState } from 'react'
import { Container, Image, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import feEnv from "../../config/envfile"
import Loader from "../../components/Loader";
import { getUserProfile, logout } from '../../actions/userActions';
import { initOrder } from '../../actions/orderActions';
import { InfoUserOrder } from '../../components/InfoUserOrder'

const InitGateScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [initGate, SetInitGate] = useState(false)
    const [globalGate, SetGlobalGate] = useState(false)
    const [cusCmt, setCusCmt] = useState('')
    const [noti, setNoti] = useState('')
    const [verify, setVerify] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const initializeOrder = useSelector(state => state.initializeOrder)
    const { loading: orderLoading, res, success } = initializeOrder
    const userProfile = useSelector(state => state.userProfile)
    const { loading, user, error } = userProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else {
            if (Object.keys(user).length === 0) {
                dispatch(getUserProfile())
            }
            else if (error) {
                dispatch(logout())
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, userInfo, user])

    const startOpenGate = (e) => {
        e.preventDefault()
        SetInitGate(true)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (verify) {
            dispatch(initOrder({
                orderType: "paymentgateway-init",
                globalGate, cusCmt
            }))
        } else {
            setNoti('vui lòng check reCaptcha')
        }
    }

    const handleVerify = () => {
        setVerify(!verify);
        setNoti('')
    }
    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <Image src='https://kartpay.com/assets/v2/img/hero-img2.png'></Image>
                </Col>
                <Col >
                    {!initGate && <Form.Group style={{ textAlign: 'center' }} controlId="initgate">
                        <h2 className='mb-3'>Đăng ký cổng thanh toán</h2>
                        <p>Nếu bạn đang có một website bán hàng và muốn tích hợp dịch vụ cổng thanh toán thẻ vào cửa hàng của mình thì hãy nhan nhanh tay đăng ký</p>
                        <Button onClick={startOpenGate}>Tiến hành mở cổng thanh toán</Button>
                    </Form.Group>}
                    {loading && <Loader />}
                    {initGate && user.name &&
                        < Form onSubmit={submitHandler} className='mt-5' style={{ textAlign: 'center' }} controlId="initgate">
                            {InfoUserOrder(user)}
                            <Col>
                                <Form.Label>Thu Nhập</Form.Label>
                                <Form.Control disabled value={user.job.salary} placeholder="salary" />
                            </Col>
                            <Form.Group as={Col} id="gatetype">
                                <Form.Label >Chọn loại cổng thanh toán</Form.Label>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Form.Check style={{ color: 'springgreen' }} type="radio" label="Quốc tế" checked={globalGate === true}
                                        onChange={() => SetGlobalGate(true)} />
                                    <Form.Check style={{ color: 'springgreen' }} type="radio" label="Nội địa" checked={globalGate === false}
                                        onChange={() => SetGlobalGate(false)} />
                                </div>
                            </Form.Group>
                            <Row className="my-3">
                                <Form.Group controlId="formGridCity">
                                    <Form.Label>Ghi chú cho chúng tôi</Form.Label>
                                    <Form.Control required as="textarea" style={{ height: '75px' }} placeholder="ghi chú"
                                        value={cusCmt} onChange={e => setCusCmt(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <ReCAPTCHA sitekey={`${feEnv.RECAPTCHA_KEY}`} onChange={handleVerify} />
                                </Col>
                                <Col>
                                    <Button type='submit' style={{ width: '100%' }}>Submit</Button>
                                </Col>
                            </Row>
                            {noti && <Alert variant="warning"> {noti}</Alert>}
                            {orderLoading ? <Loader />
                                : success === true ? <Alert variant="success"> {res.message}</Alert>
                                    : success === false ? < Alert variant="danger"> {res.message}</Alert>
                                        : <></>}
                        </Form>
                    }
                </Col>
            </Row>
        </Container >
    )
}

export default InitGateScreen

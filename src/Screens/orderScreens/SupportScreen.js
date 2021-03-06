import React, { useState, useEffect } from 'react'
import { Nav, Col, Row, Tab, Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, logout } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import ReCAPTCHA from "react-google-recaptcha";
import feEnv from "../../config/envfile"
import Loader from '../../components/Loader'
import { getAllCard } from '../../actions/managermentAction'
import { allPaymentGate } from "../../actions/managermentAction"
import { InfoUserOrder } from '../../components/InfoUserOrder'
import { initOrder } from '../../actions/orderActions'

const SupportScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const { loading, user, error } = userProfile

    const initializeOrder = useSelector(state => state.initializeOrder)
    const { loading: orderLoading, res, success } = initializeOrder

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const { allPaymentgate } = useSelector(state => state.getAllPaymentgate)
    const { allCard } = useSelector(state => state.getAllCard)

    const [cusCmt1, setCusCmt1] = useState('')
    const [cusCmt2, setCusCmt2] = useState('')

    const [noti1, setNoti1] = useState('')
    const [verify1, setVerify1] = useState(false)

    const [noti2, setNoti2] = useState('')
    const [verify2, setVerify2] = useState(false)

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
            else {
                dispatch(getAllCard()).then(dispatch(allPaymentGate()))
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, userInfo, user])

    const handleVerify1 = () => {
        setVerify1(!verify1);
        setNoti2('')
    }

    const submitHandler1 = (e) => {
        e.preventDefault()
        if (verify1) {
            dispatch(initOrder({
                orderType: "paymentgateway-cancel",
                gateId: selectedGate._id,
                cusCmt: cusCmt1,
            }))
        } else {
            setNoti1('vui l??ng check reCaptcha')
        }
    }

    const handleVerify2 = () => {
        setVerify2(!verify2);
        setNoti2('')
    }

    const submitHandler2 = (e) => {
        e.preventDefault()
        if (verify2) {
            dispatch(initOrder({
                orderType: "card-cancel",
                cardId: selectedCard._id,
                cusCmt: cusCmt2,
            }))
        } else {
            setNoti2('vui l??ng check reCaptcha')
        }
    }
    const [selectedGate, setSelectedGate] = useState({})
    const selectGate = (e) => {
        e.preventDefault()
        if (e.target.value === 'blankgate') {
            setSelectedGate({})
        }
        else {
            setSelectedGate(allPaymentgate.find(gate => gate._id === e.target.value))
        }
    }

    const [selectedCard, setSelectedCard] = useState({})
    const selectCard = (e) => {
        e.preventDefault()
        if (e.target.value === 'blankcard') {
            setSelectedCard({})
        }
        else {
            setSelectedCard(allCard.find(card => card._id === e.target.value))
            console.log(selectedCard)
        }
    }

    return (
        <Container className='my-5'>
            {loading && <Loader />}
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Y??u c???u h???y c???ng thanh to??n</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Y??u c???u h???y th???</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Form onSubmit={submitHandler1}>
                                    {user.name && InfoUserOrder(user)}
                                    <Row className="my-3">
                                        <Form.Group controlId="formGridCity">
                                            <Form.Label>Lo???i c???ng</Form.Label>
                                            <Form.Select name="type" id="type" onChange={selectGate}>
                                                <option value="blankgate">ch???n c???ng</option>
                                                {allPaymentgate && allPaymentgate.map(gate => {
                                                    return (<option value={gate._id}>{gate.isGlobal ? 'C???ng thanh to??n qu???c t???' : 'C???ng thanh to??n n???i ?????a'}</option>)
                                                })}
                                            </Form.Select >
                                        </Form.Group>
                                        {Object.keys(selectedGate).length !== 0 &&
                                            <Form.Group controlId="formGridCity">
                                                <Row>
                                                    <Col>
                                                        <Form.Label>Key C???ng</Form.Label>
                                                        <Form.Control disabled type="text" value={`${selectedGate.apiKey.slice(0, 15) + '*******'}`} />
                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Tr???ng th??i</Form.Label>
                                                        <Form.Control disabled type="text" value={selectedGate.isActive ? '??ang ho???t ?????ng' : 'D???ng ho???t ?????ng'} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>Ng??y t???o</Form.Label>
                                                        <Form.Control disabled type="date" value={selectedGate.createdAt.slice(0, 10)} />
                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Ng??y c???p nh???t</Form.Label>
                                                        <Form.Control disabled type="date" value={selectedGate.updatedAt.slice(0, 10)} />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        }
                                        <Form.Group controlId="formGridCity">
                                            <Form.Label>Ghi ch?? cho ch??ng t??i</Form.Label>
                                            <Form.Control required as="textarea" style={{ height: '75px' }} placeholder="ghi ch??"
                                                value={cusCmt1} onChange={e => setCusCmt1(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ReCAPTCHA sitekey={`${feEnv.RECAPTCHA_KEY}`} onChange={handleVerify1} />
                                        </Col>
                                        <Col>
                                            <Button type='submit' style={{ width: '100%' }}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                                {noti1 && <Alert variant="warning"> {noti1}</Alert>}
                                {orderLoading ? <Loader />
                                    : success === true ? <Alert variant="success"> {res.message}</Alert>
                                        : success === false ? < Alert variant="danger"> {res.message}</Alert>
                                            : <></>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Form onSubmit={submitHandler2}>
                                    {user.name && InfoUserOrder(user)}
                                    <Row className="my-3">
                                        <Form.Group controlId="formGridCity">
                                            <Form.Label>Ch???n card</Form.Label>
                                            <Form.Select name="type" id="type" onChange={selectCard}>
                                                <option value="blankcard">ch???n card</option>
                                                {allCard && allCard.map(card => {
                                                    return (<option value={card._id}>{card.cardTypeId.cardName}</option>)
                                                })}
                                            </Form.Select >
                                        </Form.Group>
                                        {Object.keys(selectedCard).length !== 0 &&
                                            <Form.Group controlId="formGridCity">
                                                <Row>
                                                    <Col>
                                                        <Form.Label>S??? th???</Form.Label>
                                                        <Form.Control disabled type="text" value={`${'*******' + selectedCard.cardNumber.slice(-4)}`} />
                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Tr???ng th??i</Form.Label>
                                                        <Form.Control disabled type="text" value={selectedCard.isActive ? '??ang ho???t ?????ng' : '???? kh??a'} />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>H???n d??ng t???</Form.Label>
                                                        <Form.Control disabled type="date" value={selectedCard.validDate.slice(0, 10)} />
                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Ng??y h???t h???n</Form.Label>
                                                        <Form.Control disabled type="date" value={selectedCard.expiredDate.slice(0, 10)} />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        }
                                        <Form.Group controlId="formGridCity">
                                            <Form.Label>Ghi ch?? cho ch??ng t??i</Form.Label>
                                            <Form.Control required as="textarea" style={{ height: '75px' }} placeholder="ghi ch??"
                                                value={cusCmt2} onChange={e => setCusCmt2(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ReCAPTCHA sitekey={`${feEnv.RECAPTCHA_KEY}`} onChange={handleVerify2} />
                                        </Col>
                                        <Col>
                                            <Button type='submit' style={{ width: '100%' }}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                                {noti2 && <Alert variant="warning"> {noti2}</Alert>}
                                {orderLoading ? <Loader />
                                    : success === true ? <Alert variant="success"> {res.message}</Alert>
                                        : success === false ? < Alert variant="danger"> {res.message}</Alert>
                                            : <></>}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container >
    )
}

export default SupportScreen

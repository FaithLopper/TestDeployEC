import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button, Col, Row, Image, Alert } from "react-bootstrap";
import { detailCard } from "../../actions/cardAction"
import FormContainer from "../../components/FormContainer";
import { CreditInfoPanel, DebitInfoPanel, DomInfoPanel } from "../../components/CardInfoPanel";
import { initOrder } from "../../actions/orderActions";
import ReCAPTCHA from "react-google-recaptcha";
import feEnv from "../../config/envfile"
import { getUserProfile, logout } from '../../actions/userActions';
import Loader from "../../components/Loader";
import { InfoUserOrder } from '../../components/InfoUserOrder'

const InitCardScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cardUrl = useParams().cardUrl;
    const cardType = useParams().cardType;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const { card, loading: cardLoading, error: cardErr } = useSelector(state => state.cardDetail)

    const initializeOrder = useSelector(state => state.initializeOrder)
    const { loading, res, success } = initializeOrder

    const userProfile = useSelector(state => state.userProfile)
    const { user, error } = userProfile

    const [cusCmt, setCusCmt] = useState('')
    const [noti, setNoti] = useState('')
    const [verify, setVerify] = useState(false)


    useEffect(() => {
        //dispatch(getUserProfile())
        if (!userInfo || !cardUrl || !cardType) {
            navigate('/login')
        }
        else {
            dispatch(detailCard(cardType, cardUrl))
            if (Object.keys(user).length === 0) {
                dispatch(getUserProfile())
            }
            else if (error) {
                dispatch(logout())
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, userInfo, user, cardType, cardUrl])

    const regisCardSub = (e) => {
        e.preventDefault();
        if (card) {
            if (verify) {
                let cardTypeFixed = card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)
                dispatch(initOrder({
                    orderType: "card-init",
                    cardTypeFixed,
                    cardTypeId: card._id,
                    cusCmt
                }))
            } else {
                setNoti('vui l??ng check reCaptcha')
            }

        }
    }

    const handleVerify = () => {
        setVerify(!verify);
        setNoti('')
    }

    return (
        <FormContainer>
            {cardLoading ? <Loader />
                : !card ? < Alert variant="danger"> {cardErr}</Alert>
                    : <></>
            }
            {card && <Form onSubmit={regisCardSub}>
                <Link style={{ color: 'white' }} className='btn button-20 my-3' to={`/card/${cardType}`}>Quay v???</Link>
                <h3 style={{ textAlign: 'center' }}>Th??ng tin Th???</h3>
                <Row className="d-sm-block d-lg-flex" xs={10} md={10} lg={12}>
                    <Form.Group as={Col} className="mb-3 text-center" id="formGridCheckbox">
                        <Image alt="cardimage" src={card.image} width={250} />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" id="general_info">
                        <Form.Label>T??n Th???</Form.Label>
                        <Form.Control disabled value={card.cardName} placeholder="cardname" />

                        <Form.Label>Nh?? ph??t h??nh</Form.Label>
                        <Form.Control disabled value={card.publisher} placeholder="cardpublisher" />
                        <Row>
                            <Col>
                                <Form.Label>Lo???i Th???</Form.Label>
                                <Form.Control disabled value={
                                    card.cardType === 'intCredits' ? 'Th??? t??n d???ng'
                                        : card.cardType === 'intdebits' ? 'Th??? ghi n??? Qu???c T???'
                                            : card.cardType === 'domdebits' ? 'Th??? ghi n??? N???i ?????a'
                                                : ''
                                } placeholder="cardtype" />
                            </Col>
                            <Col>
                                <Form.Label>C???p Th???</Form.Label>
                                <Form.Control disabled value={card.cardRank} placeholder="cardrank" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Ph?? ph??t h??nh (VN??)</Form.Label>
                                <Form.Control disabled value={card.issueFee} placeholder="cardrank" />
                            </Col>
                            <Col>
                                <Form.Label>Ph?? th?????ng ni??n (VN??)</Form.Label>
                                <Form.Control disabled value={card.yearlyFee} placeholder="cardrank" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>

                {card && card.cardType === 'intCredits' && CreditInfoPanel(card)}
                {card && card.cardType === 'intDebits' && DebitInfoPanel(card)}
                {card && card.cardType === 'domDebits' && DomInfoPanel(card)}

                {user.name && <Form.Group>
                    {InfoUserOrder(user)}
                    <Col>
                        <Form.Label>Thu Nh???p</Form.Label>
                        <Form.Control disabled value={user.job.salary} placeholder="salary" />
                    </Col>
                </Form.Group>}

                <Row className="my-3">
                    <Form.Group controlId="formGridCity">
                        <Form.Label>Ghi ch?? cho ch??ng t??i</Form.Label>
                        <Form.Control required as="textarea" style={{ height: '75px' }} placeholder="ghi ch??"
                            value={cusCmt} onChange={e => setCusCmt(e.target.value)} />
                    </Form.Group>
                </Row>
                {!card.isIssuing && <Alert variant="warning"> Hi???n th??? kh??ng m??? ????ng k?? vui l??ng ch???n th??? kh??c&#160;&#160;
                    <Alert.Link href={`/card/${cardType}`}>Quay v???</Alert.Link></Alert>}
                {noti && <Alert variant="warning"> {noti}</Alert>}

                {loading ? <Loader />
                    : success === true ? <Alert variant="success"> {res.message}</Alert>
                        : success === false ? < Alert variant="danger"> {res.message}</Alert>
                            : <></>}

                <ReCAPTCHA sitekey={`${feEnv.RECAPTCHA_KEY}`} onChange={handleVerify} />
                <Button className='btn button-21 mb-3' style={{ width: '250px' }} type="submit" disabled={!card.isIssuing}>
                    ????ng k??
                </Button>
            </Form>}
        </FormContainer >
    )
}

export default InitCardScreen

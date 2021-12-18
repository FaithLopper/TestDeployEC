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
                setNoti('vui lòng check reCaptcha')
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
                <Link style={{ color: 'white' }} className='btn button-20 my-3' to={`/card/${cardType}`}>Quay về</Link>
                <h3 style={{ textAlign: 'center' }}>Thông tin Thẻ</h3>
                <Row className="d-sm-block d-lg-flex" xs={10} md={10} lg={12}>
                    <Form.Group as={Col} className="mb-3 text-center" id="formGridCheckbox">
                        <Image alt="cardimage" src={card.image} width={250} />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" id="general_info">
                        <Form.Label>Tên Thẻ</Form.Label>
                        <Form.Control disabled value={card.cardName} placeholder="cardname" />

                        <Form.Label>Nhà phát hành</Form.Label>
                        <Form.Control disabled value={card.publisher} placeholder="cardpublisher" />
                        <Row>
                            <Col>
                                <Form.Label>Loại Thẻ</Form.Label>
                                <Form.Control disabled value={card.cardType} placeholder="cardtype" />
                            </Col>
                            <Col>
                                <Form.Label>Cấp Thẻ</Form.Label>
                                <Form.Control disabled value={card.cardRank} placeholder="cardrank" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Phí phát hành (VNĐ)</Form.Label>
                                <Form.Control disabled value={card.issueFee} placeholder="cardrank" />
                            </Col>
                            <Col>
                                <Form.Label>Phí thường niên (VNĐ)</Form.Label>
                                <Form.Control disabled value={card.yearlyFee} placeholder="cardrank" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>

                {card && card.cardType === 'intCredits' && CreditInfoPanel(card)}
                {card && card.cardType === 'intDebits' && DebitInfoPanel(card)}
                {card && card.cardType === 'domDebits' && DomInfoPanel(card)}

                {user.name && <Form.Group>
                    <Col className="mt-3">
                        <h3 style={{ textAlign: 'center' }}>Thông tin Khách hàng</h3>
                        <Row>
                            <Col>
                                <Form.Label>Tên Khách Hàng</Form.Label>
                                <Form.Control disabled value={user.name} placeholder="username" />
                            </Col>
                            <Col>
                                <Form.Label>CMND/CCCD</Form.Label>
                                <Form.Control disabled value={"*******" + user.personalIdNumber.number.slice(-4)} placeholder="personid" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled value={user.email.slice(0, 5) + "*******" + user.email.slice(-8)} placeholder="email" />
                            </Col>
                            <Col>
                                <Form.Label>Số tài khoản</Form.Label>
                                <Form.Control disabled value={"*******" + user.accNumber.slice(-4)} placeholder="accNumber" />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Form.Label>Thu Nhập</Form.Label>
                        <Form.Control disabled value={user.job.salary} placeholder="salary" />
                    </Col>
                </Form.Group>}

                <Row className="my-3">
                    <Form.Group controlId="formGridCity">
                        <Form.Label>Ghi chú cho chúng tôi</Form.Label>
                        <Form.Control required as="textarea" style={{ height: '75px' }} placeholder="ghi chú"
                            value={cusCmt} onChange={e => setCusCmt(e.target.value)} />
                    </Form.Group>
                </Row>
                {!card.isIssuing && <Alert variant="warning"> Hiện thẻ không mở đăng ký vui lòng chọn thẻ khác&#160;&#160;
                    <Alert.Link href={`/card/${cardType}`}>Quay về</Alert.Link></Alert>}
                {noti && <Alert variant="warning"> {noti}</Alert>}

                {loading ? <Loader />
                    : success === true ? <Alert variant="success"> {res.message}</Alert>
                        : success === false ? < Alert variant="danger"> {res.message}</Alert>
                            : <></>}

                <ReCAPTCHA sitekey={`${feEnv.RECAPTCHA_KEY}`} onChange={handleVerify} />
                <Button className='btn button-21 mb-3' style={{ width: '250px' }} type="submit" disabled={!card.isIssuing}>
                    Đăng ký
                </Button>
            </Form>}
        </FormContainer >
    )
}

export default InitCardScreen

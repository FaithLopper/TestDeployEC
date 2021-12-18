import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { submitPayment } from '../../actions/userActions'
import { ArrowBarRight } from 'react-bootstrap-icons'

const SubChargeScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const curURL = useLocation().search;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const paymentId = new URLSearchParams(curURL).get('paymentId');
    const token = new URLSearchParams(curURL).get('token');
    const PayerID = new URLSearchParams(curURL).get('PayerID');

    const userSubPayment = useSelector(state => state.userSubPayment)
    const { loading, errorRes, successRes } = userSubPayment
    
    useEffect(() => {
        if (!userInfo || !paymentId || !token || !PayerID) {
            navigate('/login')
        }
        else {
            dispatch(submitPayment(paymentId, PayerID))
            if (!loading) {
                setTimeout(function () {
                    window.location.href = '/profile';
                }, 10000);
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, userInfo, paymentId, token, PayerID])

    return (
        <Container style={{ marginTop: 110 }}>
            <Row className='justify-content-center pt-5'>
                <Col xs={12} md={8} lg={6}>
                    {successRes && (<Alert className='justify-content-center' variant='success'>{successRes.message}&#160;&#160;&#160;
                        <Alert.Link href="/">Trở lại trang cá nhân trong 10 giây </Alert.Link></Alert>
                    )}
                    {errorRes && <Alert className='justify-content-center' variant='danger'>{errorRes.message}&#160;&#160;&#160;
                        <Alert.Link href="/">Trở về trang chủ <ArrowBarRight /></Alert.Link></Alert>}
                    {loading && <Loader />}
                </Col>
            </Row>
        </Container >
    )
}

export default SubChargeScreen;

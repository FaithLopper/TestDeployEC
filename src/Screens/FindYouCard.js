import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { listCard } from "../actions/cardAction";
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import OneCard from '../components/OneCard';


const FindYouCard = () => {
    const dispatch = useDispatch()
    const curURL = useLocation().search;
    const cardPub = new URLSearchParams(curURL).get('cardPub');
    const amount = new URLSearchParams(curURL).get('amount');
    const cardRank = new URLSearchParams(curURL).get('cardRank');

    const { cards } = useSelector((state) => state.cardList);
    const { intCredits } = cards;


    useEffect(() => {
        if (!intCredits) {
            dispatch(listCard())
        }
        // eslint-disable-next-line
    }, [dispatch, intCredits])

    let yourCards = []
    if (intCredits) {
        yourCards = intCredits.filter(function (intCredit) {
            return (amount && cardPub !== '' && cardRank !== ''
                ? (intCredit.condition < (Number(amount) + 1) && intCredit.publisher === cardPub && intCredit.cardRank === cardRank)
                : amount && cardPub !== '' && cardRank === ''
                    ? (intCredit.condition < (Number(amount) + 1) && intCredit.publisher === cardPub)
                    : amount && cardPub === '' && cardRank !== ''
                        ? (intCredit.condition < (Number(amount) + 1) && intCredit.cardRank === cardRank)
                        : amount && cardPub === '' && cardRank === ''
                            ? (intCredit.condition < (Number(amount) + 1)) : [])
        });
    }

    return (
        <Container className="my-4">
            <Row className="card-item">
                {yourCards.length === 0 ? < Alert variant='danger' style={{ textAlign: 'center' }}>
                    <h4>Không tìm thấy</h4>
                    <Alert.Link href="/">Trở về trang chủ </Alert.Link></Alert>
                    : < Alert variant='success' style={{ textAlign: 'center' }}>
                        <h4>Tìm thấy {yourCards.length} thẻ </h4>
                        <Alert.Link href="/">Trở về trang chủ </Alert.Link></Alert>
                }
                {yourCards.length !== 0
                    && yourCards.map((yourCard) => (
                        <Col xs="8" md="6" className="py-3">
                            <OneCard card={yourCard} cardType="intCredits" />
                        </Col>
                    ))}
            </Row>
        </Container >
    )
}

export default FindYouCard

import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { detailCard } from "../actions/cardAction";
import { Col, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { CompareCreditPanel, CompareDebitPanel, CompareDomPanel } from '../components/compareInfoPanel';
import Loader from "../components/Loader";

const CompareScreen = () => {
    const dispatch = useDispatch()

    const curURL = useLocation().search;
    const { error, loading } = useSelector(state => state.cardDetail)

    const type = new URLSearchParams(curURL).get('type');
    const card1 = new URLSearchParams(curURL).get('card0');
    const card2 = new URLSearchParams(curURL).get('card1');
    const card3 = new URLSearchParams(curURL).get('card2');

    let comparedCardsList = [card1, card2, card3]
    const [comparedCardsDetail, setComparedCardsDetail] = useState([])

    useEffect(() => {
        if (comparedCardsDetail.length === 0) {
            comparedCardsList.forEach(element => {
                if (element !== null) {
                    dispatch(detailCard(type, element)).then(e => {
                        if (e !== undefined) {
                            comparedCardsDetail.push(e)
                            setComparedCardsDetail([...comparedCardsDetail])
                        }
                    })
                }
            });
        }
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <>
            {comparedCardsDetail.length !== 0 ?
                <>
                    <Link style={{ color: 'white', width: '10%' }} className='btn button-20 my-3' to={`/card/${type}`}>Quay về</Link>
                    {loading && <Loader />}
                    <div xs={12} md={8} lg={7} className='my-2 d-lg-flex d-md-flex'>
                        {comparedCardsDetail.map(e =>
                            <Col>{
                                type === 'intCredits' ? CompareCreditPanel(e)
                                    : type === 'intDebits' ? CompareDebitPanel(e)
                                        : type === 'domDebits' ? CompareDomPanel(e) : <></>
                            }</Col>
                        )}
                    </div>
                </> : error ? <Container className='my-5'><Alert variant='danger text-center'>Không tìm thấy thẻ (lỗi dữ liệu - 404)</Alert></Container> : <></>
            }
        </>
    )
}

export default CompareScreen

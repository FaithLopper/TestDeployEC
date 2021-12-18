import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
    ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { detailCard } from "../actions/cardAction"
function CreditDetail() {
    const cardUrl = useParams().cardUrl;
    const cardType = useParams().cardType;


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailCard(cardType, cardUrl))
    }, []);
    const { loading, card } = useSelector(state => state.cardDetail)
    var isIssuing = 'Không';
    var maxPay = `${card.maxPay}`;
    console.log(card.maxPay);

    if (card.isIssuing) {
        isIssuing = 'Có';
    } else {
        isIssuing = 'Không';
    }


    return (
        <>
            <div className="container">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="white-box text-center">
                                <img src={card.image} className="img-responsive" /></div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-6">
                            <h4 className="box-title mt-5">Thông tin thẻ</h4>
                            <p>{card.description}</p>




                            <h3 className="box-title mt-5">Thông tin chính</h3>
                            <ul className="list-unstyled">
                                <li><i className="fa fa-check text-success"></i>Tên thẻ: {card.cardName}</li>
                                <li><i className="fa fa-check text-success"></i>Hạng thẻ: {card.cardRank}</li>
                                <li><i className="fa fa-check text-success"></i>Nhà phát hành: {card.publisher}</li>

                            </ul>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">General Info</h3>
                            <div className="table-responsive">
                                <table className="table table-striped table-product">
                                    <tbody>
                                        <tr>
                                            <td>Loại thẻ</td>
                                            <td>{card.cardType}</td>
                                        </tr>
                                        <tr>
                                            <td width="390">Được phát hành</td>
                                            <td> {isIssuing}</td>
                                        </tr>
                                        <tr>
                                            <td>Hạng thẻ</td>
                                            <td>{card.cardRank}</td>
                                        </tr>
                                        <tr>
                                            <td>Điều kiện mở thẻ</td>
                                            <td>{card.condition}</td>
                                        </tr>
                                        <tr>
                                            <td>Ngày sao kê</td>
                                            <td>{card.statmentDay}</td>
                                        </tr>
                                        <tr>
                                            <td>Hạn mức tín dụng</td>
                                            <td>{card.creditLine} VND</td>
                                        </tr>
                                        <tr>
                                            <td>Thời gian trả</td>
                                            <td>{card.payWithin} VND</td>
                                        </tr>
                                        <tr>
                                            <td>Ngày tháng sau ngày đến hạn bắt đầu tính</td>
                                            <td>{card.interestRate} VND</td>
                                        </tr>
                                        <tr>
                                            <td>Phí làm lại thẻ</td>
                                            <td>{card.issueFee}</td>
                                        </tr>
                                        <tr>
                                            <td>Phí hằng năm</td>
                                            <td>{card.yearlyFee}</td>
                                        </tr>
                                        <tr>
                                            <td>Phí chuyển tiền</td>
                                            <td>{card.exCurrency}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default CreditDetail;

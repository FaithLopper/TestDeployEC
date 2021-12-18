import React from 'react'
import { Form, Col, Row } from "react-bootstrap";

export const CreditInfoPanel = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <Form.Label>Điều kiện mở thẻ</Form.Label>
                    <Form.Control disabled value={`Lương tháng từ ${props.condition} VNĐ`} placeholder="condition" />
                </Col>
                <Col>
                    <Form.Label>Hạng mức tín dụng</Form.Label>
                    <Form.Control disabled value={`${props.creditLine} VNĐ`} placeholder="creditLine" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Ngày sao kê thẻ</Form.Label>
                    <Form.Control disabled value={`Ngày ${props.statmentDay}`} placeholder="statmentDay" />
                </Col>
                <Col>
                    <Form.Label>Ngày đến hạn thanh toán sao kê</Form.Label>
                    <Form.Control disabled value={`Sau ngày sao kê ${props.payWithin} ngày`} placeholder="payWithin" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Lãi suất</Form.Label>
                    <Form.Control disabled value={`${props.interestRate * 100}% / Tháng`} placeholder="interestRate" />
                </Col>
                <Col>
                    <Form.Label>Phí chuyển đổi ngoài tệ</Form.Label>
                    <Form.Control disabled value={`${props.exCurrency * 100}% / 1 giao dịch`} placeholder="exCurrency" />
                </Col>
            </Row>
        </>
    )
}

export const DebitInfoPanel = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <Form.Label>Tiền thanh toán tối đa</Form.Label>
                    <Form.Control disabled value={`${props.maxPay} VNĐ / 1 ngày`} placeholder="maxpay" />
                </Col>
                <Col>
                    <Form.Label>Phí chuyển đổi ngoài tệ</Form.Label>
                    <Form.Control disabled value={`${props.exCurrency * 100}% / 1 giao dịch`} placeholder="exCurrency" />
                </Col>
            </Row>
        </>
    )
}

export const DomInfoPanel = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <Form.Label>Tiền thanh toán tối đa</Form.Label>
                    <Form.Control disabled value={`${props.maxPay} VNĐ / 1 ngày`} placeholder="maxpay" />
                </Col>
            </Row>
        </>
    )
}


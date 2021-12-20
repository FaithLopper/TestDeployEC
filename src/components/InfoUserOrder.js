import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'

export const InfoUserOrder = (props) => {
    return (
        <Col className="mt-3">
            <h3 style={{ textAlign: 'center' }}>Thông tin Khách hàng</h3>
            <Row>
                <Col>
                    <Form.Label>Tên Khách Hàng</Form.Label>
                    <Form.Control disabled value={props.name} placeholder="username" />
                </Col>
                <Col>
                    <Form.Label>CMND/CCCD</Form.Label>
                    <Form.Control disabled value={"*******" + props.personalIdNumber.number.slice(-4)} placeholder="personid" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control disabled value={props.email.slice(0, 5) + "*******" + props.email.slice(-8)} placeholder="email" />
                </Col>
                <Col>
                    <Form.Label>Số tài khoản</Form.Label>
                    <Form.Control disabled value={"*******" + props.accNumber.slice(-4)} placeholder="accNumber" />
                </Col>
            </Row>
        </Col>)
}
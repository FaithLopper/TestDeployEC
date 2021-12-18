import React from 'react'
import { Nav, Col, Row, Tab, Container } from 'react-bootstrap'

const SupportScreen = () => {
    return (
        <Container className='my-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Yêu cầu hủy cổng thanh toán</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Yêu cầu hủy cổng thẻ</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h1>dsadasd</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h1>dsadasd</h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default SupportScreen

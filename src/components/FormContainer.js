import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container style={{ marginTop: 110 }}>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={7}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

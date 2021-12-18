
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const ProfileForm = ({ children }) => {
    return (
        <Container style={{ marginTop: 110 }}>
            <Row className='justify-content-center' >
                <Col className='d-lg-flex' xs={10} md={9} lg={10}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileForm


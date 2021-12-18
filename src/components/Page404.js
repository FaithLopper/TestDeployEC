import React from 'react'
import Message from './Message'
import FormContainer from './FormContainer'

const Page404 = () => {
    return (
        <FormContainer>
            <Message variant='danger'><h1 style={{ textAlign: 'center' }}>404</h1></Message>
        </FormContainer>
    )
}

export default Page404

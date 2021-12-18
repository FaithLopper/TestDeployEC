import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, errorRes, successRes } = userRegister

    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [isMale, setIsMale] = useState(true)
    const [number, setNumber] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [issuePlace, setIssuePlace] = useState('')
    const personalIdNumber = { number, issueDate, issuePlace }
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [title, setTitle] = useState('')
    const [workAddress, setWorkAddress] = useState('')
    const [salary, setSalary] = useState()
    const job = { title, workAddress, salary }

    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [dispatch, navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault() //dispatch register
        dispatch(register(name, birth, isMale, personalIdNumber, phoneNumber, email, homeAddress, job))
    }

    console.log(isMale)
    return (<FormContainer>
        <h1 style={{ color: 'lightyellow', textAlign: 'center', marginBottom: 30 }}>Sign Up</h1>
        <Form style={{ color: 'deepskyblue' }} onSubmit={submitHandler}>
            <Row className="mb-3" >
                <Form.Group as={Col} controlId="fullname">
                    <Form.Label >Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter Full Name"
                        value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="birthdate">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control required type="date"
                        value={birth} onChange={e => setBirth(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} id="gender" >
                    <Form.Label >Gender</Form.Label>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Form.Check style={{ color: 'springgreen' }} type="radio" label="Nam" checked={isMale === true}
                            onChange={() => setIsMale(true)} />
                        <Form.Check style={{ color: 'springgreen' }} type="radio" label="Nữ" checked={isMale === false}
                            onChange={() => setIsMale(false)} />
                    </div>
                </Form.Group>
            </Row>

            <Row className="mb-3" >
                <Form.Label style={{ fontSize: 20 }}>Personal ID Number - Issue Date - Issue Place</Form.Label>
                <Form.Group as={Col} controlId="idnumber">
                    <Form.Control required type="text" placeholder="ID Number"
                        value={number} onChange={e => setNumber(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="issuedate">
                    <Form.Control required type="date"
                        value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} id="issueplace">
                    <Form.Control required type="text" placeholder="Issue Place"
                        value={issuePlace} onChange={e => setIssuePlace(e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3" >
                <Form.Label style={{ fontSize: 20 }}>CONTRACT</Form.Label>
                <Form.Group as={Col} controlId="phonenumber">
                    <Form.Control required type="text" placeholder="Phone Number"
                        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="email">
                    <Form.Control required type="email" placeholder="Email Address"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group style={{ marginTop: 10 }} id="homeaddress">
                    <Form.Control required type="text" placeholder="Home Address"
                        value={homeAddress} onChange={e => setHomeAddress(e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3" >
                <Form.Label style={{ fontSize: 20 }}>Job Info</Form.Label>
                <Form.Group as={Col} controlId="jobtitle">
                    <Form.Control required type="text" placeholder="Job Title"
                        value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="salary">
                    <Form.Control required type="number" placeholder="May I know your Salary ?"
                        value={salary} onChange={e => setSalary(e.target.value)} />
                </Form.Group>

                <Form.Group style={{ marginTop: 10 }} id="workaddress">
                    <Form.Control required type="text" placeholder="Work Place Address"
                        value={workAddress} onChange={e => setWorkAddress(e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3" >
                <Form.Group as={Col} controlId="register">
                    <Button style={{ backgroundColor: 'palevioletred', width: '100%' }} variant="primary" type="submit">Submit</Button>
                </Form.Group>

                <Form.Group as={Col} controlId="login">
                    Have an Account ?&#160;<Link to={'/login'}> LOGIN</Link>
                </Form.Group>
            </Row>
            {successRes && <Message variant='success'>{successRes.message}</Message>}
            {errorRes && <Message variant='danger'>
                {errorRes.messages.message}, {errorRes.messages.errors.map(e => e.msg).join(', ')}</Message>}
            {loading && <Loader />}
        </Form>
    </FormContainer>)
}

export default RegisterScreen

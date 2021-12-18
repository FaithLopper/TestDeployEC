import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Modal, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, userUpPass, logout } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import ChargeTab from '../components/ChargeTab'
import DrawTab from '../components/DrawTab'
import TransferTab from '../components/TransferTab'

function MyVerticallyCenteredModal(props) {
    return (

        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'mediumspringgreen' }} id="contained-modal-title-vcenter">
                    Số dư hiện tại: {props.data} VNĐ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="Charge" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Charge" title="Charge">
                        <ChargeTab />
                    </Tab>
                    <Tab eventKey="WithDraw" title="WithDraw">
                        <DrawTab />
                    </Tab>
                    <Tab eventKey="Tranfer" title="Tranfer">
                        <TransferTab />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ProfileScreen = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const { loading, user, error } = userProfile

    const userUpdatePass = useSelector(state => state.userUpdatePass)
    const { successRes, errorRes } = userUpdatePass

    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [isMale, setIsMale] = useState(true)
    const [number, setNumber] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [issuePlace, setIssuePlace] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [title, setTitle] = useState('')
    const [workAddress, setWorkAddress] = useState('')
    const [salary, setSalary] = useState()
    const [accNumber, setAccNumber] = useState('')
    const [balance, setBalance] = useState(0)

    const [curPassword, setCurPassword] = useState('')
    const [newPassword, setNewPassWord] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    //modal button (paypal)
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else {
            if (Object.keys(user).length === 0) {
                dispatch(getUserProfile())
            }
            else if (error) {
                dispatch(logout())
            }
            else {
                setName(user.name)
                setBirth(user.birth.slice(0, 10))
                setNumber(user.personalIdNumber.number)
                setIsMale(user.isMale)
                setIssueDate(user.personalIdNumber.issueDate.slice(0, 10))
                setIssuePlace(user.personalIdNumber.issuePlace)
                setPhoneNumber(user.phoneNumber)
                setHomeAddress(user.homeAddress)
                setEmail(user.email)
                setTitle(user.job.title)
                setWorkAddress(user.job.workAddress)
                setSalary(user.job.salary)
                setAccNumber(user.accNumber)
                setBalance(user.balance)
            }
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault() //update profile
        dispatch(userUpPass(curPassword, newPassword, confirmNewPassword))

    }

    //tran4774@gmail.com   qwertyU@1
    return (<>
        <MyVerticallyCenteredModal data={balance} show={modalShow} onHide={() => setModalShow(false)} />
        <FormContainer>
            <Form id='personalinfo' style={{ color: 'deepskyblue' }}>
                <Col>
                    <h1 style={{ color: 'lightyellow' }}>Thông tin cá nhân</h1>
                    <Row className="mb-3" >
                        <Form.Group as={Col} controlId="accnumber">
                            <Form.Label >Số tài khoản</Form.Label>
                            <Form.Control required type="text" value={accNumber} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="balance">
                            <Form.Label >Số dư tài khoản:</Form.Label>
                            <Button style={{ backgroundColor: 'palevioletred', width: '100%' }}
                                variant="primary" onClick={() => setModalShow(true)}>{balance} VNĐ</Button>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" >
                        <Form.Group as={Col} controlId="fullname">
                            <Form.Label >Họ và tên</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Full Name"
                                value={name} onChange={e => setName(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="birthdate">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control required type="date"
                                value={birth} onChange={e => setBirth(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} id="gender">
                            <Form.Label >Giới tính</Form.Label>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Form.Check style={{ color: 'springgreen' }} type="radio" label="Nam" checked={isMale === true}
                                    onChange={() => setIsMale(true)} disabled={true} />
                                <Form.Check style={{ color: 'springgreen' }} type="radio" label="Nữ" checked={isMale === false}
                                    onChange={() => setIsMale(false)} disabled={true} />
                            </div>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" >
                        <Form.Label style={{ fontSize: 20 }}>Nơi cấp - Ngày cấp - Số CMND</Form.Label>

                        <Form.Group as={Col} id="issueplace">
                            <Form.Control required type="text" placeholder="Issue Place"
                                value={issuePlace} onChange={e => setIssuePlace(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="issuedate">
                            <Form.Control required type="date"
                                value={issueDate} onChange={e => setIssueDate(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group style={{ marginTop: 10 }} controlId="idnumber">
                            <Form.Control required type="text" placeholder="ID Number"
                                value={number} onChange={e => setNumber(e.target.value)} disabled={true} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" >
                        <Form.Label style={{ fontSize: 20 }}>Thông tin liên lạc</Form.Label>
                        <Form.Group as={Col} controlId="phonenumber">
                            <Form.Control required type="text" placeholder="Phone Number"
                                value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="email">
                            <Form.Control required type="email" placeholder="Email Address"
                                value={email} onChange={e => setEmail(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group style={{ marginTop: 10 }} id="homeaddress">
                            <Form.Control required type="text" placeholder="Home Address"
                                value={homeAddress} onChange={e => setHomeAddress(e.target.value)} disabled={true} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" >
                        <Form.Label style={{ fontSize: 20 }}>Thông tin nghề nghiệp</Form.Label>
                        <Form.Group as={Col} controlId="jobtitle">
                            <Form.Control required type="text" placeholder="Job Title"
                                value={title} onChange={e => setTitle(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="salary">
                            <Form.Control required type="number" placeholder="May I know your Salary ?"
                                value={salary} onChange={e => setSalary(e.target.value)} disabled={true} />
                        </Form.Group>

                        <Form.Group style={{ marginTop: 10 }} id="workaddress">
                            <Form.Control required type="text" placeholder="Work Place Address"
                                value={workAddress} onChange={e => setWorkAddress(e.target.value)} disabled={true} />
                        </Form.Group>
                    </Row>
                </Col>
            </Form>

            <Form onSubmit={e => submitHandler(e)}>
                {/* cap nhat mat khau */}
                <Row >
                    <Form.Label style={{ fontSize: 20 }}>Thay đổi mật khẩu</Form.Label>
                    <Form.Group style={{ marginTop: 10 }} controlId="curpassword">
                        <Form.Control required type="password" placeholder="Nhập mật khẩu hiện tại"
                            value={curPassword} onChange={e => setCurPassword(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} style={{ marginTop: 20, width: '50%' }} id="newpassword">
                        <Form.Control type="password" placeholder="Nhập mật khẩu mới"
                            value={newPassword} onChange={e => setNewPassWord(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ marginTop: 20, width: '50%' }} id="confirmnewpassword">
                        <Form.Control type="password" placeholder="Xác nhận nhập mật khẩu mới "
                            value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="my-3" >
                    <Form.Group as={Col} controlId="register">
                        <Button style={{ backgroundColor: 'palevioletred', width: '100%' }} variant="primary" type="submit">Cập nhật</Button>
                    </Form.Group>
                </Row>

                {successRes && <Message variant='success'>{successRes.message}</Message>}
                {errorRes && errorRes.status === 422
                    && (<Message variant='danger'> {errorRes.messages.errors.map(e => e.msg).join(', ')} </Message>)}
                {errorRes && errorRes.status === 401
                    && (<Message variant='danger'> {errorRes.messages.message} </Message>)}
                {loading && <Loader />}
            </Form>

        </FormContainer >
    </>)
}

export default ProfileScreen

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { forgotPassword } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import ReCAPTCHA from "react-google-recaptcha";
import feEnv from "../config/envfile"
import { useNavigate } from "react-router-dom"
import { USER_CONSTANTS } from "../constants/userConstants";

const ForgotScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userForgotPass = useSelector((state) => state.userForgotPass);
  const { loading, resMessage, success } = userForgotPass;
  const [email, setEmail] = useState("");
  const [vertify, setVertify] = useState(false)
  const [noti, setNoti] = useState("")

  useEffect(() => {
    if (success === true) {
      setNoti("Đã gửi email xác nhận, vui lòng kiểm tra email !")
      setTimeout(() => {
        dispatch({ type: USER_CONSTANTS.USER_FORGOT_RESET })
        navigate("/login")

      }, 3000)
    }
  }, [success, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (vertify) {
      dispatch(forgotPassword(email));
    }
    else {
      setNoti("vui lòng check reCaptcha")
    }
  };
  const handleVerify = (value) => {
    setVertify(!vertify);
    setNoti("");
  }
  return (
    <FormContainer>
      <h1
        style={{ color: "lightyellow", textAlign: "center", marginBottom: 30 }}
      >
        Quên mật khẩu
      </h1>
      {noti && <Message variant="warning">{noti}</Message>}
      {success === false && <Message variant="danger">{resMessage.messages.message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Form.Group as={Col} controlId="accEmail">
            <Form.Label>Nhập email đã đăng kí</Form.Label>
            <Form.Control
              type="email" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="captcha">
            <ReCAPTCHA sitekey={`${feEnv.RECAPTCHA_KEY}`} onChange={handleVerify} />
          </Form.Group>
        </Row>


        <Row className="py-4">
          <Col>
            <Button type="submit" variant="success" style={{ width: "100%" }}>
              Gửi
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default ForgotScreen;

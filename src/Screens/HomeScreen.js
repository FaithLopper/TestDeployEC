import React, { useState } from "react";
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap'
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";

function MyVerticallyCenteredModal(props) {

  const [amount, SetAmount] = useState(0)
  const [cardRank, SetCardRank] = useState('')
  const [cardPub, SetCardPub] = useState('')
  const navigate = useNavigate()

  const findThatCard = (e) => {
    e.preventDefault()
    navigate(`/card/findyourcard?amount=${amount}&cardPub=${cardPub}&cardRank=${cardRank}`)
  }
  return (

    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }} id="contained-modal-title-vcenter">
          <h2>Tìm thẻ phù hợp</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="my-3">
          <Col>
            <h4>Nhà phát hành</h4>
            <Form.Select name="type" id="type" onChange={e => SetCardPub(e.target.value)}>
              <option value="">...</option>
              <option value="VISA">VISA</option>
              <option value="Mastercard">Mastercard</option>
            </Form.Select >
          </Col>
          <Col>
            <h4>Hạng thẻ</h4>
            <Form.Select name="type" id="type" onChange={e => SetCardRank(e.target.value)}>
              <option value="">...</option>
              <option value="Standard">Standard</option>
              <option value="Gold">Gold</option>
            </Form.Select >
          </Col>
        </Row>
        <Row className="my-3">
          <h4>Mức thu nhập trung bình (VNĐ/Tháng)</h4>
          <Col>
            <Form.Control required type="number" min={0} max={250000000}
              value={amount} onChange={e => SetAmount(Number(e.target.value))} />
          </Col>
          <Col>
            <Button style={{ backgroundColor: 'palevioletred', width: '100%' }} variant="primary"
              onClick={findThatCard}>Tìm thẻ</Button>
          </Col>
        </Row>
        <Container>
          <h5 style={{ textAlign: 'center' }}>0 VNĐ ~ 250.000.000 VNĐ</h5>
          <Slider value={amount} onChange={e => SetAmount(e.target.value)}
            aria-label="money" min={0} max={250000000} step={1000000} marks valueLabelDisplay="auto"
            style={{ height: '100%', color: 'mediumturquoise' }} disableSwap />
        </Container>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal >
  );
}

function HomeScreen() {
  //modal button (paypal)
  const balance = 'hehe'
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <MyVerticallyCenteredModal data={balance} show={modalShow} onHide={() => setModalShow(false)} />
      <Header />
      <Container>
        <Row className="mt-4">  <Col><h2>Dịch vụ thẻ </h2> </Col>
          <Col > <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary fa-pull-right">Tìm thẻ phù hợp</button></Col>
        </Row>

        <Row>
          <div className="container card-info">

            <div className="d-lg-flex">
              <Link to={`/card/intCredits`} style={{ textDecoration: "none" }} >
                <div className="card border-0 me-lg-4 mb-lg-0 mb-4">
                  <div className="backgroundEffect" />
                  <div className="pic">
                    <img className src="https://firebasestorage.googleapis.com/v0/b/cardec-30bbb.appspot.com/o/CardTypes%2FintCredits%2Fthe-lts-internaional-credit-mastercard-gold.png?alt=media" alt="homeimage" />
                    <div className="date">
                      <span className="month">Credit</span>
                    </div>
                  </div>
                  <div className="content">
                    <p className="h-1 mt-4">THẺ TÍN DỤNG</p>
                    <p className="text-muted mt-3">
                      Thẻ tin dụng
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                      <Link to={`/card/intCredits`}>
                        <div className="btn btn-primary">
                          Xem thêm
                          <span className="fas fa-arrow-right" />
                        </div></Link>
                      <div className="d-flex align-items-center justify-content-center foot">
                        <p className="ps-3 icon text-muted">
                          <span className="fas fa-comment-alt pe-1" />5
                        </p>
                      </div>
                    </div>
                  </div>
                </div></Link>
              <Link to={`/card/intDebits`} style={{ textDecoration: "none" }}>

                <div className="card border-0 me-lg-4 mb-lg-0 mb-4">
                  <div className="backgroundEffect" />
                  <div className="pic">
                    <img className alt="homeimage2" src="https://firebasestorage.googleapis.com/v0/b/cardec-30bbb.appspot.com/o/CardTypes%2FintDebits%2Fthe-lts-internaional-Debit-mastercard-standard.png?alt=media" />
                    <div className="date">
                      <span className="month">Debit</span>
                    </div>
                  </div>
                  <div className="content">
                    <p className="h-1 mt-4">THẺ GHI NỢ QUỐC TẾ</p>
                    <p className="text-muted mt-3">
                      Thẻ Ghi nợ quốc tế
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                      <Link to={`/card/intDebits`}>
                        <div className="btn btn-primary">
                          Xem thêm
                          <span className="fas fa-arrow-right" />
                        </div></Link>
                      <div className="d-flex align-items-center justify-content-center foot">
                        <p className="ps-3 icon text-muted">
                          <span className="fas fa-comment-alt pe-1" />2
                        </p>
                      </div>
                    </div>
                  </div>
                </div></Link>
              <Link to={`/card/domDebits`} style={{ textDecoration: "none" }}>

                <div className="card border-0 mb-lg-0 mb-4">
                  <div className="backgroundEffect" />
                  <div className="pic">
                    <img className alt="homeimage3" src="https://firebasestorage.googleapis.com/v0/b/cardec-30bbb.appspot.com/o/CardTypes%2FdomDebits%2Fthe-lts-domestic-Debit-Napas-standard.png?alt=media" />
                    <div className="date">
                      <span className="month">Debit</span>
                    </div>
                  </div>
                  <div className="content">
                    <p className="h-1 mt-4">THẺ GHI NỢ NỘI ĐỊA</p>
                    <p className="text-muted mt-3">
                      Thẻ ghi nợ nội đia
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                      <Link to={`/card/domDebits`}>
                        <div className="btn btn-primary">
                          Xem thêm
                          <span className="fas fa-arrow-right" />
                        </div></Link>
                      <div className="d-flex align-items-center justify-content-center foot">
                        <p className="ps-3 icon text-muted">
                          <span className="fas fa-comment-alt pe-1" />3
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div></Row>
      </Container>
    </>
  );
}
export default HomeScreen;

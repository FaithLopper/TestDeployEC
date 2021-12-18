import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Header() {
  return (
    <>
      <div className="header-wrapper">
        <div className="main-info">
          <Container> <Row className="my-6">
            <h2> ONLINE <br /> MONEY TRANSFER</h2>{" "}
          </Row>
            <Row>
              <Col xs="5" md="4" className="mt-4">  <p>
                DỊCH VỤ PHÁT HÀNH THẺ LTS BANK XIN CHÀO QUÝ KHÁCH
              </p> </Col>

            </Row></Container>

        </div>
      </div>
    </>
  );
}

export default Header;

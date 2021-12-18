import React, { useEffect, useState } from "react";
// import cards from "../data/Card";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OneCard from "../components/OneCard";
import { listCard } from "../actions/cardAction";
import Loading from "../components/Loading";
function DomDebitScreen() {
  const dispatch = useDispatch(); //backend
  const { loading, cards } = useSelector((state) => state.cardList);
  const { domDebits } = cards;
  const [save, setSave] = useState([]);
  useEffect(() => {
    dispatch(listCard());
  }, [dispatch]);
  useEffect(() => {
    setSave(domDebits);
  }, [domDebits]);
  function filterCard(type) {
    if (save) {
      if (type === "Gold") {
        let result = domDebits.filter((c) => c.cardRank === "Gold");
        setSave(result);
      }
      if (type === "Standard") {
        let result = domDebits.filter((c) => c.cardRank === "Standard");
        setSave(result);
      }

      if (type === "Mastercard") {
        let result = domDebits.filter((c) => c.publisher === "Mastercard");
        setSave(result);
      }
      if (type === "VISA") {
        let result = domDebits.filter((c) => c.publisher === "VISA");
        setSave(result);
      }
      if (type === "All") {
        setSave(cards.domDebits);
      }
    }
  }
  return (
    <Container className="my-4">

      {loading && <Loading />}
      <Dropdown className="d-inline" style={{ marginRight: "3px" }}>
        {" "}
        Bộ lọc
        <Button
          variant="info"
          style={{ marginLeft: "15px" }}
          onClick={(e) => {
            filterCard("All");
          }}
        >
          Tất cả
        </Button>{" "}
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Hạng thẻ
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              filterCard("Gold");
            }}
          >
            Gold
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              filterCard("Standard");
            }}
          >
            Standard
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Row className="card-item">
        <h2>Thẻ ghi nợ nội địa</h2>

        {save ? (
          save.map((card) => (
            <Col xs="8" md="6" className="py-3">
              <OneCard card={card} cardType="domDebits" />
            </Col>
          ))
        ) : (
          <Loading />
        )}
      </Row>

    </Container>
  );
}

export default DomDebitScreen;

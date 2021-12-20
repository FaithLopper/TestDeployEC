import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
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

  const [ids, setIds] = useState([])

  const checkHandler = (e) => {
    let isChecked = e.target.checked
    if (isChecked) {
      if (!ids.includes(e.target.id)) {
        ids.push(e.target.id)
        setIds([...ids])
      }
    }
    else {
      if (ids.includes(e.target.id)) {
        let index = ids.indexOf(e.target.id)
        ids.splice(index, 1)
        setIds([...ids])
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
        <Container>
          {ids.length === 0 ? <></>
            : ids.length === 1 ? <Alert variant='info' >Chọn thêm 1 thẻ nữa để so sánh</Alert>
              : ids.length > 3 ? < Alert variant='warning'> vui lòng chỉ chọn tối đa 3 thẻ</Alert>
                : <Alert variant='success' style={{ justifyContent: 'center' }} >
                  <Link
                    to={`/card/compare?type=domDebits&${ids.map(e => { return (`card${ids.indexOf(e)}=` + e) }).join('&')}`}>
                    <Button>So sánh {ids.length} thẻ </Button></Link>
                </Alert>}
        </Container>
        {save ? (
          save.map((card) => (
            <Col xs="8" md="6" className="py-3">
              <input type='checkbox' className="specialcheckboxoflodo"
                id={card.cardUrl} onChange={checkHandler} ></input>
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

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OneCard from "../components/OneCard";
import { listCard } from "../actions/cardAction";
import Loading from "../components/Loading";
import {  useParams } from "react-router";
import Message from "../components/Message";
function FindCardScreen() {
  const dispatch = useDispatch(); //backend
  const params = useParams();
  var cardname = params.cardname;
  const { loading, cards } = useSelector((state) => state.cardList);
  const { intCredits, intDebits, domDebits } = cards;
  const [store, setStore] = useState();
  const [all, setAll] = useState();
  useEffect(() => {
    dispatch(listCard());
  }, [dispatch]);

  useEffect(() => {
    if (intCredits) {
      const allcard = [...intCredits, ...intDebits, ...domDebits];
      setStore(allcard);
      setAll(allcard);
      if (all) {
        let filtedArray = all.filter((card) => {
          let upperCard = card.cardName.toUpperCase();
          let upperSearch = params.cardname.slice(1).toUpperCase();
          if (upperCard.includes(`${upperSearch}`)) {
            return card;
          }
          return null
        });
        setStore(filtedArray);
      }
    }
     // eslint-disable-next-line
  }, [intCredits, intDebits, domDebits]);
  useEffect(() => {
    if (all) {
      let filtedArray = all.filter((card) => {
        let upperCard = card.cardName.toUpperCase();
        let upperSearch = params.cardname.slice(1).toUpperCase();
        if (upperCard.includes(`${upperSearch}`)) {
          return card;
        }
        return null
      });
      setStore(filtedArray);
    }
     // eslint-disable-next-line
  }, [cardname]);

  function filterCard(type) {
    if (store) {
      if (type === "Gold") {
        let result = all.filter((c) => c.cardRank === "Gold");
        setStore(result);
      }
      if (type === "Standard") {
        let result = all.filter((c) => c.cardRank === "Standard");
        setStore(result);
      }

      if (type === "MasterCard") {
        let result = all.filter((c) => c.publisher === "MasterCard");
        setStore(result);
      }
      if (type === "VISA") {
        let result = all.filter((c) => c.publisher === "VISA");
        setStore(result);
      }
      if (type === "All") {
        setStore(all);
      }
    }
  }

  return (
    <>
      <Container className="" style={{marginTop:"30px"}}>
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

        <Dropdown className="d-inline">
          <Dropdown.Toggle variant="success" id="dropdown-basic1">
            Nhà phát hành
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                filterCard("MasterCard");
              }}
            >
              Master Card
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                filterCard("VISA");
              }}
            >
              Visa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Row className="card-item">
          <h2>Các loại thẻ </h2>
          {store ? (
            store.length === 0 ? (
              <Message variant="danger">Không tìm thấy thẻ</Message>
            ) : (
              <Message variant="success">
                Đã tìm được {store.length} thẻ
              </Message>
            )
          ) : (
            <Message variant="success">Đã tìm được </Message>
          )}
          {store ? (
            store.map((card) => (
              <Col xs="8" md="6" className="py-3">
                <OneCard card={card} cardType="intCredits" />
              </Col>
            ))
          ) : (
            <Loading />
          )}
        </Row>
      </Container>
    </>
  );
}

export default FindCardScreen;

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { allPaymentGate } from "../actions/managermentAction";
const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "gateOwner", headerName: "Người mở cổng thanh toán", width: 180 },
  { field: "isGlobal", headerName: "Cổng thanh toán", width: 170 },
  { field: "isActive", headerName: "Trạng thái", width: 100 },
  {
    field: "apiKey",
    headerName: "API key",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Thời gian tạo",
    width: 300,
  },
];

function PaymentGate() {
  const dispatch = useDispatch();

  const [data, setData] = useState();

  const { allPaymentgate } = useSelector((state) => state.getAllPaymentgate);

  useEffect(() => {
    dispatch(allPaymentGate());
  }, [dispatch]);

  useEffect(() => {
    if (allPaymentgate) {
      let filted = allPaymentgate.map((payment) => {
        let time = new Date(payment.createdAt);
        let type;
        let status;
        if (payment.isGlobal === true) {
          type = "Cổng Quốc tế";
        } else {
          type = "Cổng Nội địa";
        }
        if (payment.isActive === true) {
          status = "Hoạt động";
        } else {
          status = "Không hoạt động";
        }
        let arr = {
          id: payment._id,
          gateOwner: payment.gateOwner,
          isGlobal: type,
          isActive: status,
          apiKey: payment.apiKey,
          createdAt: time,
        };
        return arr;
      });
      setData(filted);
    }
  }, [allPaymentgate]);

  return (
    <>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "100px",
          backgroundColor: "white",
          minHeight: "70vh",
        }}
      >
        <div style={{ height: 400, width: "100%" }}>
          <h2 style={{ textAlign: "center" }}>Danh sách đơn</h2>
          {data ? (
            <>
              <DataGrid
                style={{ marginTop: "50px" }}
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </>
          ) : (
            <Loader />
          )}
        </div>
      </Container>
    </>
  );
}

export default PaymentGate;

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import {
  allOrder,
} from "../actions/adminControlAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "orderType", headerName: "Loại", width: 150 },
  { field: "status", headerName: "Tình trạng", width: 100 },
  {
    field: "createdAt",
    headerName: "Thời gian tạo",
    type: "number",
    width: 280,
  },
  {
    field: "accNumber",
    headerName: "Số tài khoản",
    width: 200,
  },
  {
    field: "cusName",
    headerName: "Tên khách hàng",
    width: 150,
  },
];
var page = 1;
function AdminOrderView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const allOrderList= useSelector((state)=>state.adminOrderAll)
  const {adminOrderAll}=allOrderList
  const {adminOrderApprove}= useSelector(state=>state.adminOrderApprove)
  const {adminOrderDeny}= useSelector(state=>state.adminOrderDeny)
  useEffect(()=>{
    if(adminOrderApprove)
          if(Object.keys(adminOrderApprove).length === 0){
       window.location.reload(false)
     }
  },[adminOrderApprove,adminOrderDeny])
  useEffect(() => {
    if (adminInfo) {
      if (Object.keys(adminInfo).length === 0) {
        console.log(adminInfo);
        navigate("/admin");
      }
    }
  }, [adminInfo, navigate]);
  useEffect(() => {
    dispatch(allOrder(page));
  }, [dispatch]);
 
  useEffect(()=>{
    if(adminOrderAll){
        let filted= adminOrderAll.docs.map(order=>{
            let time1=new Date(order.createdAt)
            let arr={
                id:order._id,
                orderType: order.orderType,
                status: order.status,
                createdAt: time1,
                accNumber: order.accNumber,
                cusName: order.cusName
            }
            return arr
        })
        setData(filted)
    }
  },[adminOrderAll])

  const clickHandler = (params, event) => {
    navigate(`/admin/control/order/detail/${params.id}`);
  };
  function handleChange(event, value) {
    dispatch(allOrder(value));
    page = value;
  }
  return (
    <>
      <div
        className="content-wrapper"
        style={{ height: "94vh", marginTop: "-88px" }}
      >
        <div
          className="main-content"
          style={{ backgroundColor: "rgb(251, 255, 255)" }}
        >
          <AdminNav />
          <div
            style={{
              display: "flex",
              height: "100vh",
              overflow: "scroll initial",
            }}
          >
            <SlideBar />
            <Container maxWidth="lg" style={{ marginTop: "100px" }}>
              <div style={{ height: 400, width: "100%" }}>
                <h2 style={{ textAlign: "center" }}>Danh sách đơn</h2>
                {data && adminOrderAll ? (
                  <>
                    <DataGrid
                      style={{ marginTop: "50px" }}
                      onCellDoubleClick={clickHandler}
                      rows={data}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      hideFooterPagination={true}
                    />{" "}
                    <Stack spacing={2}>
                      <Pagination count={adminOrderAll.totalPages} variant="outlined" shape="rounded" page={page}  onChange={handleChange}/>
                    </Stack>{" "}
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrderView;

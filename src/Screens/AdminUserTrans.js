import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,useLocation} from "react-router-dom"
import {getDetailUserInfo} from "../actions/adminControlAction"
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import Loader from "../components/Loader";
const columns = [
    {
        field: "id",
        headerName: "Mã số",
        width: 225,
      },
  { field: "transactionLog", headerName: "Mã giao dịch", width: 220 },
  {
    field: "endingBalance",
    headerName: "Số dư",
    type: "number",
    width: 130,
  },
  { field: "description", headerName: "Mô tả giao dịch", width: 250 },
  { field: "createAt", headerName: "Thời gian giao dịch", width: 200 },
 
 
];
function AdminUserTrans() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const location = useLocation()
  const id= location.search.slice(5);
  const [data, setData] = useState();
  const { userDetail} = useSelector(state=>state.adminControlUserDetail)

  const adminLogin= useSelector(state =>state.adminLogin)
    const {adminInfo}= adminLogin;
    useEffect(()=>{
      if(adminInfo){
        if(Object.keys(adminInfo).length===0){
          console.log(adminInfo)
          navigate('/admin')
        } 
      }
  },[adminInfo,navigate])
  useEffect(() => {
    dispatch(getDetailUserInfo(id));
  }, [id,dispatch]);
 
  useEffect(() => {
    if (userDetail) {
      let save = validateData(userDetail);
      setData(save);
      console.log(save);
    }
  }, [userDetail]);
  function validateData(list) {
    const userData = list.balanceFluctuations.map((user) => {
      const { _id ,transactionLog, endingBalance, description, createAt, } = user;
      let data = {
        id :_id,transactionLog, endingBalance, description, createAt, 
      };
      return data;
    });
    return userData;
  }

  const clickHandler = (params, event) => {
    navigate(`/admin/control/user/details?_id=${params.id}`)

  };

  function logHandler (){
    navigate(`/admin/control/user/transactionlog?_id=${id}`)
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
          <h2 style={{ textAlign: "center" }}>Lịch sử giao dịch</h2>
          <Button variant="contained" style={{margin:"15px 0 0 5px"}} onClick={logHandler}>
                          Log
                        </Button>
          {data ? (<DataGrid
            onCellDoubleClick={clickHandler}
            
            columns={columns}
            rows={data}
            pageSize={10}
            rowsPerPageOptions={[5]}
            
          />): <Loader />}
          
        </div>
      </Container>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default AdminUserTrans;

import React, { useState, useEffect } from "react";
import {  Container, Pagination } from "@mui/material";
import { getUserTransactionLog } from "../actions/adminControlAction";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,useLocation} from "react-router-dom"
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import Loader from "../components/Loader";
import {Row} from "react-bootstrap"
var page=1
function AdminUserTransLog() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const location = useLocation()
  const id= location.search.slice(5);
  const [data, setData] = useState();
 
  const { userTrans} = useSelector(state=>state.adminControlUserTransaction)

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
  useEffect(()=>{
    dispatch(getUserTransactionLog(id,page));
  },[dispatch,id])
  useEffect(()=>{
    if(userTrans){
        setData(userTrans.docs)
    }
  },[userTrans])
  function pageHandler(e,value){
    dispatch(getUserTransactionLog(id,value))
    page=value
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
            <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <div style={{ height: 650, width: "100%" }}>
          <h2 style={{ textAlign: "center" }}>Lịch sử giao dịch</h2>
           <div style={{color:"black",fontSize:"13px"}}>
           {data ? data.map(log =>(
            <div style={{marginBottom:"30px" ,border:"solid 1px",padding:"15px"}}>
                <Row> from: 
                bank: {log.from.bank},
                number: {log.from.bank},
                remitterName: {log.from.bank},
                UID: {log.from.bank}
            ,
            transType: {log.transType},
            to: 
                bank: {log.to.bank},
                number: {log.to.number},
                receiverName:{log.to.receiverName}
            ,
            fromCurrency: 
                transactionAmount: {log.fromCurrency.transactionAmount},
                transactionFee:  {log.fromCurrency.transactionFee},
                currency_code:  {log.fromCurrency.currency_code}
            ,
            toCurrency: 
                transactionAmount: {log.toCurrency.transactionAmount},
                transactionFee: {log.toCurrency.transactionFee},
                currency_code: {log.toCurrency.currency_code}
            ,
            exchangeRate: {log.exchangeRate},
            description: {log.description},
            createdAt: {log.createdAt},
            updatedAt: {log.updatedAt} </Row>
           </div>
           )) : <Loader/>}
           </div>
        </div>
        {
          userTrans && (<Pagination count={userTrans.totalPages} variant="outlined" shape="rounded" page={page}  onChange={pageHandler}/>)
        }
        
      </Container>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default AdminUserTransLog;

import React,{useState,useEffect} from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import {useDispatch,useSelector} from "react-redux"
import {detailTransaction} from "../actions/managermentAction"
import {useLocation} from "react-router-dom"
import Loader from '../components/Loader'
import localTime from "../util/localTime";
function TransLogDetailScreen() {
    const dispatch= useDispatch();
    const location= useLocation()
    const id= location.search.slice(4)

    const[detail,setDetail]= useState()
    const trans=useSelector(state=>state.detailTransaction)
    const {detailTrans} = trans
    
    useEffect(()=>{
      dispatch(detailTransaction(id))
      // eslint-disable-next-line
    },[dispatch])
    useEffect(()=>{
        if(detailTrans){
            setDetail(detailTrans) 
        }
    },[detailTrans])
    return (
       
            <Container style={{marginTop:"50px",backgroundColor:"white",minHeight:"70vh"}}>
            <h2 style={{ textAlign: "center" ,color:"black",marginBottom:"50px"}}>Chi tiết giao dịch</h2>

           

            {detail ? (<> <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        style={{border: '1px solid grey',padding:"20px 0 20px 20px" }}
                        noValidate
                        autoComplete="off"

                      >
                         <TextField
                            id="standard-read-only-input"
                            label="Mã giao dịch"
                            defaultValue={detail._id}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Loại giao dịch"
                            defaultValue={detail.transType.service_name}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Mô tả chi tiết"
                            defaultValue={detail.description}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Thời gian tạo"
                            defaultValue={localTime(detail.createdAt)}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Tỉ lệ đổi ngoại tệ"
                            defaultValue={detail.exchangeRate}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                             <TextField
                            id="standard-read-only-input"
                            label="Số tiền"
                            defaultValue={detail.fromCurrency.transactionAmount}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Phí giao dịch"
                            defaultValue={detail.fromCurrency.transactionFee}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Đơn vị"
                            defaultValue={detail.fromCurrency.currency_code}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        style={{border: '1px solid grey',padding:"20px 0 20px 20px" }}
                        noValidate
                        autoComplete="off"

                      >
                         <TextField
                            id="standard-read-only-input"
                            label="Từ ngân hàng"
                            defaultValue={detail.from.bank}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Từ tài khoản"
                            defaultValue={detail.from.number}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Người chuyển"
                            defaultValue={detail.from.remitterName}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                          
                        
                           
                           
                      </Box>

                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        style={{border: '1px solid grey',padding:"20px 0 20px 20px" }}
                        noValidate
                        autoComplete="off"

                      >
                         <TextField
                            id="standard-read-only-input"
                            label="Đến ngân hàng"
                            defaultValue={detail.to.bank}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Đến tài khoản"
                            defaultValue={detail.to.number}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Tài khoản nhận"
                            defaultValue={detail.to.UID}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                           
                          />
                        
                           
                           
                      </Box>

                                   
                                    </> 
                      ) : <Loader />} 
                
            </Container>
        
    )
}

export default TransLogDetailScreen

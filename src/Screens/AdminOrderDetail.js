import React,{useState,useEffect} from "react";
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {Checkbox,Button} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import {useDispatch,useSelector} from "react-redux"
import {getDetailOrder,approveOrder,denyOrder} from "../actions/adminControlAction"
import {useNavigate,useParams} from "react-router-dom"
import Loader from '../components/Loader'
import localTime from "../util/localTime";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function AdminOrderDetail() {
    const dispatch= useDispatch();
    const navigate=useNavigate()
    const params= useParams()
    const id= params.id
    useEffect(()=>{

      dispatch(getDetailOrder(id))
     
    },[dispatch,id])
    const adminLogin= useSelector(state =>state.adminLogin)
    const {adminInfo}= adminLogin;
    const [message,setMessage]=useState("")
    useEffect(()=>{
      if(adminInfo){
        if(Object.keys(adminInfo).length===0){
          console.log(adminInfo)
          navigate('/admin')
        } 
      }
  },[adminInfo,navigate])
 

    const {adminOrderDetail} = useSelector(state=>state.adminOrderDetail)
    const {adminOrderApprove}= useSelector(state=>state.adminOrderApprove)
    const {adminOrderDeny}= useSelector(state=>state.adminOrderDeny)


    const[detail,setDetail]= useState()
    const [open, setOpen] = React.useState(false);
    useEffect(()=>{
      if(adminOrderDetail){
        setDetail(adminOrderDetail)
       
      }
    },[adminOrderDetail])
    useEffect(()=>{
      if(adminOrderApprove){
       setMessage(adminOrderApprove.message)
        setOpen(true)

      }
    },[adminOrderApprove])
    useEffect(()=>{
      if(adminOrderDeny){
        setMessage(adminOrderDeny.message)
        setOpen(true)
      }
    },[adminOrderDeny])
    
    const approveHandler=()=>{
      if(adminOrderDetail){
        dispatch(approveOrder(adminOrderDetail._id,detail.bankCmt))
        
      }
     
    }

    const denyHandler=()=>{
      if(adminOrderDetail){
        dispatch(denyOrder(adminOrderDetail._id,detail.bankCmt))
      
      }
     
    }   
  const handleClose = () => {
    setOpen(false);
    window.location.reload()
    
  };
  function handler(e){
    setDetail({
      ...detail,
      bankCmt: e.target.value
    })

  }
    return (
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
            <Container style={{marginTop:"50px"}}>
            <h2 style={{ textAlign: "center" ,color:"black",marginBottom:"50px"}}>Thông tin order</h2>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Thông báo!!!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  
                  <Button onClick={handleClose} autoFocus>
                    Đồng ý
                  </Button>
                </DialogActions>
              </Dialog>

            {adminOrderDetail && detail ? (<> <Box
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
                            label="Đơn yêu cầu"
                            defaultValue={adminOrderDetail.orderType}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Tình trạng"
                            defaultValue={adminOrderDetail.status}
                            InputProps={{
                              readOnly: true,
                            }}
                            color="success"
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Lời nhắn khách hàng"
                            defaultValue={adminOrderDetail.cusCmt}
                            InputProps={{
                              readOnly: true,
                             }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Lời nhắn ngân hàng"
                            defaultValue={adminOrderDetail.bankCmt}
                            onChange={handler}
                            
                            
                            variant="standard"
                          />
                          <TextField
                            id="standard-read-only-input"
                            label="Thời gian"
                            defaultValue={localTime(adminOrderDetail.createdAt)}
                            InputProps={{
                              readOnly: true,
                            }}
                            style={{width:"265px"}}
                            fullWidth="true"
                            variant="standard"
                          />
                      </Box>



                                    <Box
                                    component="form"
                                    sx={{
                                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    style={{border: '1px solid grey' ,marginTop:"50px",padding:"20px 0 20px 20px"}}
                                    noValidate
                                    autoComplete="off"

                                    >
                                    <div>
                                    <div>
                        <TextField
                            id="standard-read-only-input"
                            label="ID"
                            defaultValue={adminOrderDetail.orderOwner._id}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Tên khách hàng"
                            defaultValue={adminOrderDetail.orderOwner.name}
                            InputProps={{ readOnly: true,
                              
                            }}
                            color="success"
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Ngày sinh"
                            defaultValue={adminOrderDetail.orderOwner.birth.slice(0,10)}
                            InputProps={{ readOnly: true,
                              
                            }}
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Số điện thoại"
                            defaultValue={adminOrderDetail.orderOwner.phoneNumber}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Email"
                            defaultValue={adminOrderDetail.orderOwner.email}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Địa chỉ"
                            defaultValue={adminOrderDetail.orderOwner.homeAddress}
                            InputProps={{
                              readOnly: true,
                            }}
                           
                            variant="standard"
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Số tài khoản"
                            defaultValue={adminOrderDetail.orderOwner.accNumber}
                            InputProps={{
                              readOnly: true,
                            }}
                            
                            
                            variant="standard"
                          />
                          
                            
                       
                            <span style={{color:"black"}}>
                            <Checkbox {...label} checked={adminOrderDetail.orderOwner.isMale}   />Nam</span>
                        </div>
                        
                     
                      
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Số CMND"
                                        defaultValue={adminOrderDetail.orderOwner.personalIdNumber.number}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                       
                                        variant="standard"
                                      />
                                      <TextField
                                        id="standard-read-only-input"
                                        label="Ngày phát hành"
                                        defaultValue={adminOrderDetail.orderOwner.personalIdNumber.issueDate.slice(0,10)}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      
                                        variant="standard"
                                      />
                                      <TextField
                                        id="standard-read-only-input"
                                        label="Nơi cấp"
                                        defaultValue={adminOrderDetail.orderOwner.personalIdNumber.issuePlace}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                     
                                        variant="standard"
                                      />
                                      <TextField
                                        id="standard-read-only-input"
                                        label="Nghề nghiệp"
                                        defaultValue={adminOrderDetail.orderOwner.job.title}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                    
                                        variant="standard"
                                      />
                                        <TextField
                                        id="standard-read-only-input"
                                        label="Nơi làm việc"
                                        defaultValue={adminOrderDetail.orderOwner.job.workAddress}
                                     
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        variant="standard"
                                      />
                                        <TextField
                                        id="standard-read-only-input"
                                        label="Mức lương"
                                      
                                        defaultValue={adminOrderDetail.orderOwner.job.salary}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        variant="standard"
                                      />
                                     
                                          </div>
                                        
                                    </Box>
                                    <Button variant="contained" style={{margin:"15px 0 0 5px"}} color="success" onClick={approveHandler}>
                          Xác nhận
                        </Button>
                        <Button variant="contained" style={{margin:"15px 0 0 5px",float:"right"}} color="error" onClick={denyHandler}>
                         Từ chối
                        </Button>
                                    </> 
                      ) : <Loader />}
                
            </Container>
          </div>
        </div>
      </div>
    )
}

export default AdminOrderDetail

import React,{useState,useEffect} from "react";
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {Checkbox,Button} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import {useDispatch,useSelector} from "react-redux"
import {getDetailUserInfo,updateUserProfile} from "../actions/adminControlAction"
import {useLocation,useNavigate} from "react-router-dom"
import Loader from '../components/Loader'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function AdminUserDetail() {
    const dispatch= useDispatch();
    const location= useLocation()
    const navigate=useNavigate()
    const id= location.search.slice(5);
    const adminLogin= useSelector(state =>state.adminLogin)
    const {adminInfo}= adminLogin;
    const [user,setUser]=useState({
      _id: null,
      name: null,
      birth: null,
      isMale: null,
      personalIdNumber: {
          number: null,
          issueDate: null,
          issuePlace: null
      },
      phoneNumber: null,
      email: null,
      homeAddress: null,
      job: {
          title: null,
          workAddress: null,
          salary: null
      },
      isActive: null
})
    useEffect(()=>{
      if(adminInfo){
        if(Object.keys(adminInfo).length===0){
          console.log(adminInfo)
          navigate('/admin')
        } 
      }
  },[adminInfo,navigate])
    useEffect(()=>{
      dispatch(getDetailUserInfo(id))
      
    },[id,dispatch])
    const { userDetail} = useSelector(state=>state.adminControlUserDetail)
    const[detail,setDetail]= useState()
    const [open, setOpen] = React.useState(false);
    useEffect(()=>{
      if(userDetail){
        setDetail(userDetail)
        setUser({
          _id: userDetail._id,
          name: userDetail.name,
          birth: userDetail.birth,
          isMale: userDetail.isMale,
          personalIdNumber: {
              number: userDetail.personalIdNumber.number,
              issueDate: userDetail.personalIdNumber.issueDate,
              issuePlace: userDetail.personalIdNumber.issuePlace
          },
          phoneNumber: userDetail.phoneNumber,
          email: userDetail.email,
          homeAddress: userDetail.homeAddress,
          job: {
              title: userDetail.job.title,
              workAddress: userDetail.job.workAddress,
              salary: userDetail.job.salary
          },
          isActive: userDetail.isActive
          
        })

        console.log(user)
      }
    },[userDetail,user])
    const {noti}=useSelector(state=>state.notiUser)
    useEffect(()=>{
      if(noti){
        setOpen(true);
      }
    },[noti])
    const clickHandler=()=>{
      navigate(`/admin/control/user/transaction?_id=${id}`)
    }

    function statusHandler(e){
  

  
      setUser({
        ...user,
        isActive:e.target.checked
      })
      console.log(user)
    }
    function maleHandler(e){
        setUser({
          ...user,
          isMale:e.target.checked
        })
    }

    function sendHandler(){
        dispatch(updateUserProfile(user))
        
    }
    
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false)
  };
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
            <h2 style={{ textAlign: "center" ,color:"black",marginBottom:"50px"}}>Thông tin cá nhân</h2>

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
                   Đã cập nhật thông tin tài khoản thành công.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  
                  <Button onClick={handleClose} autoFocus>
                    Đồng ý
                  </Button>
                </DialogActions>
              </Dialog>

            {detail ? (<> <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        style={{border: '1px solid grey',padding:"20px 0 20px 20px" }}
                        noValidate
                        autoComplete="off"

                      >
                        <div>
                        <TextField
                            id="standard-read-only-input"
                            label="ID"
                            defaultValue={detail._id}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                            color="warning"
                            focused
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Tên khách hàng"
                            defaultValue={detail.name}
                            InputProps={{
                              
                            }}
                            color="success"
                            variant="standard"
                            onChange={(e)=>{setUser(
                              {
                                ...user,
                                name:e.target.value
                              }
                            )}}
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Ngày sinh"
                            defaultValue={detail.birth.slice(0,10)}
                          
                            variant="standard"
                            onChange={(e)=>{setUser(
                              {
                                ...user,
                                birth:e.target.value
                              }
                            )}}
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Số điện thoại"
                            defaultValue={detail.phoneNumber}
                            InputProps={{
                             
                            }}
                            onChange={(e)=>{setUser(
                              {
                                ...user,
                                phoneNumber:e.target.value
                              }
                            )}}
                            variant="standard"
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Email"
                            defaultValue={detail.email}
                            InputProps={{
                             
                            }}
                            onChange={(e)=>{setUser(
                              {
                                ...user,
                                email:e.target.value
                              }
                            )}}
                            variant="standard"
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Địa chỉ"
                            defaultValue={detail.homeAddress}
                            InputProps={{
                             
                            }}
                            onChange={(e)=>{setUser(
                              {
                                ...user,
                                homeAddress:e.target.value
                              }
                            )}}
                            variant="standard"
                          />
                            <TextField
                            id="standard-read-only-input"
                            label="Số tài khoản"
                            defaultValue={detail.accNumber}
                            InputProps={{
                              readOnly: true,
                            }}
                            
                            color="warning"
                            focused 
                            variant="standard"
                          />
                             <TextField
                            id="standard-read-only-input"
                            label="Số dư trong tài khoản"
                            defaultValue={detail.balance}
                            InputProps={{
                              readOnly: true,
                            }}
                            color="warning"
                            focused
                            variant="standard"
                          />
                          <span style={{color:"black"}}>
                            <Checkbox {...label} checked={user.isActive}  onChange={e=>{statusHandler(e)}} />Trạng thái</span>
                            <span style={{color:"black"}}>
                            <Checkbox {...label} checked={user.isMale}  onChange={maleHandler} />Nam</span>
                        </div>
                        
                     
                                                  
                        <Button variant="contained"  style={{margin:"15px 0 0 5px"}} onClick={sendHandler}>
                          Gửi
                        </Button>
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
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Số CMND"
                                        defaultValue={detail.personalIdNumber.number}
                                        InputProps={{
                                         
                                        }}
                                        onChange={(e)=>{setUser(
                                          {
                                            ...user,
                                            personalIdNumber:{
                                              ...user.personalIdNumber,
                                              number:e.target.value
                                            }
                                          }
                                        )}}
                                        variant="standard"
                                      />
                                      <TextField
                                        id="standard-read-only-input"
                                        label="Ngày phát hành"
                                        defaultValue={detail.personalIdNumber.issueDate.slice(0,10)}
                                        InputProps={{
                                         
                                        }}
                                        onChange={(e)=>{setUser(
                                          {
                                            ...user,
                                            personalIdNumber:{
                                              ...user.personalIdNumber,
                                              issueDate:e.target.value
                                            }
                                          }
                                        )}}
                                        variant="standard"
                                      />
                                      <TextField
                                        id="standard-read-only-input"
                                        label="Nơi cấp"
                                        defaultValue={detail.personalIdNumber.issuePlace}
                                        InputProps={{
                                         
                                        }}
                                        onChange={(e)=>{setUser(
                                          {
                                            ...user,
                                            personalIdNumber:{
                                              ...user.personalIdNumber,
                                              issuePlace:e.target.value
                                            }
                                          }
                                        )}}
                                        variant="standard"
                                      />
                                      <TextField
                                        id="standard-read-only-input"
                                        label="Nghề nghiệp"
                                        defaultValue={detail.job.title}
                                        InputProps={{
                                         
                                        }}
                                        onChange={(e)=>{setUser(
                                          {
                                            ...user,
                                            job:{
                                              ...user.job,
                                              title:e.target.value
                                            }
                                          }
                                        )}}
                                        variant="standard"
                                      />
                                        <TextField
                                        id="standard-read-only-input"
                                        label="Nơi làm việc"
                                        defaultValue={detail.job.workAddress}
                                        onChange={(e)=>{setUser(
                                          {
                                            ...user,
                                            job:{
                                              ...user.job,
                                              workAddress:e.target.value
                                            }
                                          }
                                        )}}
                                        InputProps={{
                                        
                                        }}
                                        variant="standard"
                                      />
                                        <TextField
                                        id="standard-read-only-input"
                                        label="Mức lương"
                                        onChange={(e)=>{setUser(
                                          {
                                            ...user,
                                            job:{
                                              ...user.job,
                                              salary:e.target.value
                                            }
                                          }
                                        )}}
                                        defaultValue={detail.job.salary}
                                        InputProps={{
                                         
                                        }}
                                        variant="standard"
                                      />
                                      <Button variant="contained" style={{margin:"15px 0 0 5px"}} onClick={clickHandler}>
                          Lịch sử giao dịch
                        </Button>
                                          </div>
                                    </Box></> 
                      ) : <Loader />}
                
            </Container>
          </div>
        </div>
      </div>
    )
}

export default AdminUserDetail

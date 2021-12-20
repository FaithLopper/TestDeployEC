import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { viewCard,newCard } from "../actions/adminControlAction";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,Link} from "react-router-dom"
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "cardUrl", headerName: "Thẻ url", width: 200 },
  {
    field: "publisher",
    headerName: "Nhà phát hành",
    width: 130,
  },
  {
    field: "cardName",
    headerName: "Tên thẻ",
    width: 200,
  },
  {
    field: "cardRank",
    headerName: "Hạng thẻ",
    width: 100,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 350,
  },
  

];
function AdminCardView() {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [data, setData] = useState();
  const [status,setStatus]=useState(false)
  const [id,setId]=useState()
  const [send,setSend]=useState({
    cardNumber: null,
    publisher: null,
    CVV: null
  })

  const [type,setType]=useState("intCredits")
  const [message,setMessage]=useState("intCredits")
  const [open, setOpen] = React.useState(false);
  const {adminCard} = useSelector (state=>state.adminCardView)
  const adminLogin= useSelector(state =>state.adminLogin)
  const {errorCardNewnull,notiCardNew}=useSelector(state=>state.adminCardNew)
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
    dispatch(viewCard(type))
  },[dispatch,type])
  useEffect(()=>{
    if(adminCard){
        let cardList= filter(adminCard.message)
        setData(cardList)
      
    }
  },[adminCard])
  useEffect(()=>{
    if(notiCardNew){
      setMessage(notiCardNew.message)
      setOpen(true)
    }
    if(errorCardNewnull){
      setMessage(errorCardNewnull.message)
      setOpen(true)
    }
  },[notiCardNew,errorCardNewnull])

  function filter(array){
      let array2= array.map(card=>{
        var filted={
          id:card._id,
          cardUrl:card.cardUrl,
          publisher:card.publisher,
          cardName:card.cardName,
          cardRank:card.cardRank,
          description:card.description,
        }
        return filted
      })
      return array2
  }
  function clickHandler(e){
    navigate(`/admin/control/card/update/${type}/${e.row.cardUrl}`)
  }
  function cardHandler(e){
    setType(e.target.value)
    dispatch(viewCard(e.target.value))
  }
  function selectHandler(params,e){
    setStatus(true)
    setId(params.row.id)

  }
  function sendHandler(){
    dispatch(newCard(type,id,send))
  }
  
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

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
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <div style={{ height: 400, width: "100%" }}>
          <h2 style={{ textAlign: "center" }}>Danh sách thẻ</h2>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-filled-label">Loại thẻ</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        onChange={cardHandler}
                        defaultValue={"intCredits"}
                        >
                        <MenuItem value="intCredits">Tín dụng quốc tế</MenuItem>
                        <MenuItem value="intDebits">Ghi nợ quốc tế</MenuItem>
                        <MenuItem value="domDebits">Ghi nợ nội địa</MenuItem>
                        </Select>
                    </FormControl>
            <Link to="/admin/control/card/create"><span style={{float:"right"}}>
            <IconButton aria-label="AddIcon" fontSize="large" >
        <AddIcon fontSize="large"/>
      </IconButton> 
            </span></Link>
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

                    
          {data &&   (<>
           <DataGrid
            style={{marginTop:"50px"}}
            onCellDoubleClick={clickHandler}
            onCellClick={selectHandler}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
          /> 
           {
          status && (
          <>
                  <div>
                                <Box
                                    component="form"
                                    sx={{
                                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    style={{border: '1px solid grey' ,marginTop:"50px",padding:"20px 0 20px 20px"}}
                                    noValidate
                                    autoComplete="off"

                                    >
                                      
                          <TextField
                            id="standard-read-only-input"
                            label="ID thẻ"
                            value={id}
                            InputProps={{
                              readOnly: true,
                            }}
                            color="success"
                            variant="standard"
                            focused
                          />

                          <TextField
                            id="standard-read-only-input"
                            label="Số thẻ"
                            onChange={e=>{setSend({
                              ...send,
                              cardNumber:e.target.value
                            })}}
                            color="success"
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="Nhà phát hành"
                            onChange={e=>{setSend({
                              ...send,
                              publisher:e.target.value
                            })}}
                            
                            variant="standard"
                           
                          />
                           <TextField
                            id="standard-read-only-input"
                            label="CVV"
                           
                            onChange={e=>{setSend({
                              ...send,
                              CVV:e.target.value
                            })}}
                            
                            
                            variant="standard"
                          />
                                      </Box>
            

           <Button variant="contained" style={{margin:"15px 0 0 5px"}} color="success" onClick={sendHandler}> Xác nhận</Button>
           </div>
          </>
         
          
          )
        } 
           </>) }
       
        </div>
      </Container>
      </div>
        </div>
      </div>
    </>
  );
}

export default AdminCardView;

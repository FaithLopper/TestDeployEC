import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { viewCard } from "../actions/adminControlAction";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,Link} from "react-router-dom"
import Stack from '@mui/material/Stack';
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


  const [type,setType]=useState("intCredits")

  const {adminCard} = useSelector (state=>state.adminCardView)
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
    dispatch(viewCard(type))
  },[dispatch,type])
  useEffect(()=>{
    if(adminCard){
        let cardList= filter(adminCard.message)
        setData(cardList)
      
    }
  },[adminCard])
  
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
          <h2 style={{ textAlign: "center" }}>Danh sách thẻ</h2>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-filled-label">Loại thẻ</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        onChange={cardHandler}
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
            
                    
          {data &&   (<>
           <DataGrid
            style={{marginTop:"50px"}}
            onCellDoubleClick={clickHandler}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
          />   <Stack spacing={2}>
        </Stack> </>) }
        </div>
      </Container>
      </div>
        </div>
      </div>
    </>
  );
}

export default AdminCardView;

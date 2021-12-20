import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { getAllUserInfo,getSearchlUserInfo } from "../actions/adminControlAction";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import Loader from "../components/Loader";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const columns = [
  { field: "id", headerName: "ID", width: 150  },
  { field: "name", headerName: "Tên khách hàng", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "phoneNumber",
    headerName: "Số điện thoại",
    type: "number",
    width: 130,
  },
  {
    field: "isMale",
    headerName: "Giới tính",
    width: 100,
  },
  {
    field: "personalIdNumber",
    headerName: "CMND",
    width: 150,
  },
];
var page=1;
function AdminUserView() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [data, setData] = useState();
  const [prop,setProp]=useState();
  const [key,setKey]=useState()
  const {   listUser } = useSelector(
    (state) => state.adminControl
  );
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
    if(adminInfo===null){
    
       
        navigate('/admin')
    
    }else{
      dispatch(getAllUserInfo(page));
    }
   
  }, [adminInfo,dispatch,navigate]);

  useEffect(() => {
    if (listUser) {
      let save = validateData(listUser);
      setData(save);
    }
  }, [listUser]);
  function validateData(list) {
    const userData = list.docs.map((user) => {
      const { _id, name, email, phoneNumber, personalIdNumber, isMale } = user;
      var sex
      if(isMale===true){
        sex="Nam"
      }else{
         sex="Nữ"
      }
      let data = {
        id: _id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        isMale: sex,
        personalIdNumber: personalIdNumber,
      };
      return data;
    });
    return userData;
  }

  const clickHandler = (params, event) => {
    navigate(`/admin/control/user/details?_id=${params.id}`)
  };
  function handleChange(event, value){

        dispatch(getAllUserInfo(value));
        page=value;
      
  }
  
  const searchHandler=(e)=>{
     
      if (!e) e = window.event;
      var keyCode = e.code || e.key;
      if (keyCode === 'Enter'){
        if(prop){
          dispatch(getSearchlUserInfo(prop,key))
      }
      }
     
      
  }
  const selectHandler=(e)=>{  
        setProp(e.target.value)
        if(e.target.value==='All'){
          dispatch(getAllUserInfo(page));
        }
  }
  function emptyHandler(e){
    if(e.target.value===''){
      dispatch(getAllUserInfo(page))
    }
  }
  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "100px" }}>
        <div style={{ height: 400, width: "100%" }}>
          <h2 style={{ textAlign: "center" }}>Danh sách người dùng</h2>
          {data && listUser ? (<>
         

      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={searchHandler}
              onKeyUp={emptyHandler}
              onChange={(e)=>{ setKey(e.target.value)}}
              value={key}
            />

<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Thuộc tính</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          defaultValue={"name"}
          onChange={selectHandler}
          label="Thuộc tính"
        >
          
          <MenuItem value="name">Tên</MenuItem>
          <MenuItem value="phoneNumber">Số điện thoại</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="accNumber">CMND</MenuItem>

        </Select>
        
      </FormControl>
          </Search>
           <DataGrid
            style={{marginTop:"50px"}}
            onCellDoubleClick={clickHandler}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            hideFooterPagination={true}
          />   <Stack spacing={2}>

          <Pagination count={listUser.totalPages} variant="outlined" shape="rounded" page={page}  onChange={handleChange}/>
        </Stack> </>) : <Loader/>}
         
        </div>
      </Container>
    </>
  );
}

export default AdminUserView;

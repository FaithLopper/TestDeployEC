import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import { Container, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Checkbox, Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { profile, updateProfile, updatePassword, logout } from "../actions/adminAuthAction";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const label = { inputProps: { "aria-label": "Checkbox demo" } };

var update = {
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
  }
}
function AdminProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminLogin = useSelector((state) => state.adminLogin);
  const notification = useSelector((state) => state.notification);
  const notiPassword = useSelector((state)=>state.notiPass)
  const {notiPass}=notiPassword
  const {noti}=notification
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (noti) {
      setOpen(true);

    }
    if (notiPass) {
      setOpen(true);

    }
  }, [noti, notiPass])

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false)
  };
  function handlePassClose() {
    dispatch(logout())
    navigate('/admin')
  }
  const { adminInfo } = adminLogin;
  useEffect(() => {
    if (adminInfo) {
      if (Object.keys(adminInfo).length === 0) {
        console.log(adminInfo);
        navigate("/admin");
      }
    }
  }, [adminInfo, navigate]);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  const { adminProfile } = useSelector(
    (state) => state.adminProfile
  );
  const [detail, setDetail] = useState();
  useEffect(() => {
    if (adminProfile) {
      if (Object.keys(adminProfile).length !== 0) {

        setDetail(adminProfile);
        setName(adminProfile.name)
        setBirth(adminProfile.birth)
        setIsMale(adminProfile.isMale)
        setNumber(adminProfile.personalIdNumber.number)
        setIssueDate(adminProfile.personalIdNumber.issueDate)
        setIssuePlace(adminProfile.personalIdNumber.issuePlace)
        setPhoneNumber(adminProfile.phoneNumber)
        setEmail(adminProfile.email)
        setHomeAddress(adminProfile.homeAddress)
        setTitle(adminProfile.job.title)
        setWorkAddress(adminProfile.job.workAddress)
        setSalary(adminProfile.job.salary)
      }
    }
  }, [adminProfile]);

  const [name, setName] = useState()
  const [birth, setBirth] = useState()
  const [isMale, setIsMale] = useState()
  const [number, setNumber] = useState()
  const [issueDate, setIssueDate] = useState()
  const [issuePlace, setIssuePlace] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const [homeAddress, setHomeAddress] = useState()
  const [title, setTitle] = useState()
  const [workAddress, setWorkAddress] = useState()
  const [salary, setSalary] = useState()
  const [password, setPassword] = useState({
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null
  })
  function submitHandler() {

    update = {
      name: name,
      birth: birth,
      isMale: isMale,
      personalIdNumber: {
        number: number,
        issueDate: issueDate,
        issuePlace: issuePlace
      },
      phoneNumber: phoneNumber,
      email: email,
      homeAddress: homeAddress,
      job: {
        title: title,
        workAddress: workAddress,
        salary: salary
      }
    }
    dispatch(updateProfile(update))
  }

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPassword({
      ...password,
      newPassword: event.target.value
    })
    console.log(password)
  };
  const handleReChange = (prop) => (event) => {
    setPassword({
      ...password,
      confirmNewPassword: event.target.value
    })
    console.log(password)
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function changePassHandler() {
    dispatch(updatePassword(password))
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Th??ng b??o!!!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ???? c???p nh???t th??ng tin t??i kho???n th??nh c??ng.
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={handleClose} autoFocus>
                ?????ng ??
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open}
            onClose={handlePassClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Th??ng b??o!!!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Thay ?????i password th??nh c??ng, xin m???i ????ng nh???p l???i.
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={handlePassClose} autoFocus>
                ?????ng ??
              </Button>
            </DialogActions>
          </Dialog>
          <Container style={{ marginTop: "50px" }}>
            <h2
              style={{
                textAlign: "center",
                color: "black",
                marginBottom: "50px",
              }}
            >
              Th??ng tin c?? nh??n
            </h2>
            {detail ? (
              <>
                {" "}
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  style={{
                    border: "1px solid grey",
                    padding: "20px 0 20px 20px",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="standard-read-only-input"
                      label="T??n kh??ch h??ng"
                      defaultValue={detail.name}
                      variant="standard"
                      onChange={e => { setName(e.target.value) }}


                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Ng??y sinh"
                      defaultValue={detail.birth.slice(0, 10)}
                      onChange={e => { setBirth(e.target.value) }}

                      variant="standard"
                    />



                    <TextField
                      id="standard-read-only-input"
                      label="S??? CMND"
                      defaultValue={detail.personalIdNumber.number}
                      onChange={e => { setNumber(e.target.value) }}

                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Ng??y ph??t h??nh"
                      defaultValue={detail.personalIdNumber.issueDate.slice(
                        0,
                        10
                      )}
                      onChange={e => { setIssueDate(e.target.value) }}

                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="N??i c???p"
                      defaultValue={detail.personalIdNumber.issuePlace}
                      onChange={e => { setIssuePlace(e.target.value) }}

                      variant="standard"
                    />

                    <TextField
                      id="standard-read-only-input"
                      label="S??? ??i???n tho???i"
                      defaultValue={detail.phoneNumber}
                      onChange={e => { setPhoneNumber(e.target.value) }}

                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Email"
                      defaultValue={detail.email}
                      onChange={e => { setEmail(e.target.value) }}

                      variant="standard"
                    />

                    <TextField
                      id="standard-read-only-input"
                      label="?????a ch???"
                      defaultValue={detail.homeAddress}
                      onChange={e => { setHomeAddress(e.target.value) }}

                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Ngh??? nghi???p"
                      defaultValue={detail.job.title}
                      onChange={e => { setTitle(e.target.value) }}

                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="N??i l??m vi???c"
                      defaultValue={detail.job.workAddress}
                      onChange={e => { setWorkAddress(e.target.value) }}

                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="M???c l????ng"
                      defaultValue={detail.job.salary}
                      onChange={e => { setSalary(e.target.value) }}

                      variant="standard"

                    />
                    <span style={{ color: "black" }}>

                      <Checkbox {...label} checked={isMale} onChange={e => { setIsMale(e.target.checked) }} />
                      Nam
                    </span>
                  </div>

                  <Button variant="contained" style={{ margin: "15px 0 0 5px" }} onClick={submitHandler}>
                    S???a
                  </Button>
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  style={{
                    border: "1px solid grey",
                    marginTop: "50px",
                    padding: "20px 0 20px 20px",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="standard-read-only-input"
                      label="M???t kh???u hi???n t???i"

                      onChange={e => {
                        setPassword({
                          ...password,
                          currentPassword: e.target.value
                        })
                      }}

                      variant="standard"

                    />

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">M???t kh???u</InputLabel>
                      <Input

                        type={values.showPassword ? 'text' : 'password'}
                        value={password.newPassword}
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Nh???p l???i m???t kh???u</InputLabel>
                      <Input

                        type={values.showPassword ? 'text' : 'password'}
                        value={password.confirmNewPassword}
                        onChange={handleReChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <Button variant="contained" style={{ margin: "15px 0 0 5px" }} onClick={changePassHandler}>
                      S???a
                    </Button>
                  </div>
                </Box>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  style={{
                    border: "1px solid grey",
                    marginTop: "50px",
                    padding: "20px 0 20px 20px",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="standard-read-only-input"
                      label="S??? t??i kho???n"
                      defaultValue={detail.accNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="ID"
                      defaultValue={detail._id}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="S??? d?? trong t??i kho???n"
                      defaultValue={detail.balance}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />{" "}
                    <span style={{ color: "black" }}>
                      <Checkbox {...label} checked={detail.isActive} />
                      Tr???ng th??i
                    </span>
                  </div>
                </Box>
              </>
            ) : (
              <Loader />
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;

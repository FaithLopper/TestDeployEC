import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import SlideBar from "../components/SlideBar";
import SendIcon from '@mui/icons-material/Send';
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Checkbox, Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {   searchCard,updateCard} from "../actions/adminControlAction";
import { useNavigate,useParams } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function AdminCardUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params= useParams();
  


  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("intCredits");
  const [card, setCard] = useState({
    _id:null,
    cardName: null,
    image: null,
    isIssuing: true,
    cardRank: null,
    publisher:null,
    description: null,
    creditLine: null,
    condition: null,
    statmentDay: null,
    payWithin: null,
    interestRate: null,
    issueFee: null,
    yearlyFee: null,
    exCurrency: null,
    maxPay: null,
    createdAt:null,
    updatedAt:null
  });

  const { adminCardSearch } = useSelector((state) => state.adminCardSearch);
  const adminLogin = useSelector((state) => state.adminLogin);

  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      if (Object.keys(adminInfo).length === 0) {
        console.log(adminInfo);
        navigate("/admin");
      }
    }
  }, [adminInfo, navigate]);
  useEffect(()=>{
    dispatch(searchCard(params.type,params.cardurl))
    setType(params.type);
  },[dispatch,setType,params])
  useEffect(()=>{
    
    if(adminCardSearch){
      console.log(type)
      switch(type){
        case "intCredits":
          setCard({
            _id:adminCardSearch,
            cardName: adminCardSearch.cardName,
            image: adminCardSearch.image,
            isIssuing: adminCardSearch.isIssuing,
            cardRank: adminCardSearch.cardRank,
            publisher:adminCardSearch.publisher,
            description: adminCardSearch.description,
            creditLine: adminCardSearch.creditLine,
            condition: adminCardSearch.condition,
            statmentDay: adminCardSearch.statmentDay,
            payWithin: adminCardSearch.payWithin,
            interestRate: adminCardSearch.interestRate,
            issueFee: adminCardSearch.issueFee,
            yearlyFee: adminCardSearch.yearlyFee,
            exCurrency: adminCardSearch.exCurrency,
            createdAt:adminCardSearch.createdAt,
            updatedAt:adminCardSearch.updatedAt
          })
        break
        case "intDebits":
          setCard({
            _id:adminCardSearch,
            cardName: adminCardSearch.cardName,
            image: adminCardSearch.image,
            isIssuing: adminCardSearch.isIssuing,
            cardRank: adminCardSearch.cardRank,
            publisher:adminCardSearch.publisher,
            description: adminCardSearch.description,
            issueFee: adminCardSearch.issueFee,
            yearlyFee: adminCardSearch.yearlyFee,
            exCurrency: adminCardSearch.exCurrency,
            maxPay: adminCardSearch.maxPay,
            createdAt:adminCardSearch.createdAt,
            updatedAt:adminCardSearch.updatedAt
          })
        break
        case "domDebits":
          setCard({
            _id:adminCardSearch,
            cardName: adminCardSearch.cardName,
            image: adminCardSearch.image,
            isIssuing: adminCardSearch.isIssuing,
            cardRank: adminCardSearch.cardRank,
            publisher:adminCardSearch.publisher,
            description: adminCardSearch.description,
            issueFee: adminCardSearch.issueFee,
            yearlyFee: adminCardSearch.yearlyFee,
            maxPay: adminCardSearch.maxPay,
            createdAt:adminCardSearch.createdAt,
            updatedAt:adminCardSearch.updatedAt
          })
        break
        default: return 
      }
      
      console.log(card)
    }
    
  },[adminCardSearch,card,type])

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };
  function sendHandler() {
    console.log(card);
    console.log(type);
    if (type !== "" && card) {
      dispatch(updateCard(type, card));
    }
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
          <Container style={{ marginTop: "50px" }}>
            <h2
              style={{
                textAlign: "center",
                color: "black",
                marginBottom: "50px",
              }}
            >
              Th??ng tin th???
            </h2>
            {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Lo???i th???
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <MenuItem value="intCredits">T??n d???ng qu???c t???</MenuItem>
                <MenuItem value="intDebits">Ghi n??? qu???c t???</MenuItem>
                <MenuItem value="domDebits">Ghi n??? n???i ?????a</MenuItem>
              </Select>
            </FormControl> */}
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
                  ???? t???o th??? th??nh c??ng.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  ?????ng ??
                </Button>
              </DialogActions>
            </Dialog>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              style={{ border: "1px solid grey", padding: "20px 0 20px 20px" }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="standard-read-only-input"
                  label="T??n th???"
                  variant="standard"
                  value={card.cardName}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      cardName: e.target.value,
                    });
                  }}
                  focused
                />
                <TextField
                  id="standard-read-only-input"
                  label="Link h??nh th???"
                  
                  variant="standard"
                  value={card.image}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      image: e.target.value,
                    });
                  }}
                  focused
                />

                <TextField
                  id="standard-read-only-input"
                  label="M?? t???"
                  variant="standard"
                  value={card.description}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      description: e.target.value,
                    });
                  }}
                  focused
                />

                <TextField
                  id="standard-read-only-input"
                  label="Nh?? ph??t h??nh"
                  variant="standard"
                  value={card.publisher}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      publisher: e.target.value,
                    });
                  }}
                  focused
                />

                {type === "intCredits" && (
                  <>
                    <TextField
                      id="standard-read-only-input"
                      label="H???n m???c t??n d???ng"
                      value={card.creditLine}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          creditLine: e.target.value,
                        });
                      }}
                      variant="standard"
                      focused
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="??i???u ki???n"
                      value={card.condition}
                      InputProps={{}}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          condition: e.target.value,
                        });
                      }}
                      variant="standard"
                      focused
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Ng??y sao k??"
                      value={card.statmentDay}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          statmentDay: e.target.value,
                        });
                      }}
                      variant="standard"
                      focused
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="Ng??y thanh to??n sau sao k??"
                      value={card.payWithin}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          payWithin: e.target.value,
                        });
                      }}
                      variant="standard"
                      focused
                    />
                    <TextField
                      id="standard-read-only-input"
                      label="L??i su???t"
                      value={card.interestRate}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          interestRate: e.target.value,
                        });
                      }}
                      variant="standard"
                      focused
                    />
                  </>
                )}

                <TextField
                  id="standard-read-only-input"
                  label="Ph?? l??m l???i th???"
                  value={card.issueFee}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      issueFee: e.target.value,
                    });
                  }}
                  variant="standard"
                  focused
                />
                <TextField
                  id="standard-read-only-input"
                  label="Ph?? h???ng n??m "
                  value={card.yearlyFee}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      yearlyFee: e.target.value,
                    });
                  }}
                  variant="standard"
                  focused
                />
                {type!=="domDebits"&& ( <TextField
                  id="standard-read-only-input"
                  label="Ph?? ?????i ngo???i t???"
                  value={card.exCurrency}
                  onChange={(e) => {
                    setCard({
                      ...card,
                      exCurrency: e.target.value,
                    });
                  }}
                  variant="standard"
                  focused
                />)}
               
                {type === "intDebits" && (
                  <TextField
                    id="standard-read-only-input"
                    value={card.maxPay}
                    label="S??? ti???n chuy???n ???????c t???i ??a"
                    onChange={(e) => {
                      setCard({
                        ...card,
                        maxPay: e.target.value,
                      });
                    }}
                    variant="standard"
                    focused
                  />
                )}

                <span>
                  <FormControl style={{ minWidth: "120px", marginLeft: "5px" }}>
                    <InputLabel id="demo-simple-select-label">
                      H???ng th???
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={card.cardRank}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          cardRank: e.target.value,
                        });
                      }}
                      
                    >
                      <MenuItem value="Gold">V??ng</MenuItem>
                      <MenuItem value="Standard">Th?????ng</MenuItem>
                    </Select>
                  </FormControl>
                </span>
                <div style={{ color: "black" }}>
                  <Checkbox
                    {...label}
                    checked={card.isIssuing}
                    value={card.isIssuing}
                    onChange={(e) => {
                      setCard({
                        ...card,
                        isIssuing: e.target.checked,
                      });
                    }}
                  />
                  Tr???ng th??i
                </div>
              </div>

              <Button
                variant="contained"
                style={{ margin: "15px 0 0 5px" }}
                onClick={sendHandler}
                endIcon={<SendIcon />}
              >
                G???i
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AdminCardUpdate;

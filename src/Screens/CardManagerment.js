import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {getAllCard,deactiveCardAction,activeCardAction} from "../actions/managermentAction"
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "cardNumber", headerName: "Số tài khoản", width: 120 },
  { field: "publisher", headerName: "Nhà phát hành", width: 100 },
  { field: "isActive", headerName: "Tình trạng", width: 100 },
  {
    field: "cardName",
    headerName: "Tên thẻ",
    width: 150,
  },
  {
    field: "cardRank",
    headerName: "Hạng thẻ",
    width: 100,
  },
  {
    field: "currentUsed",
    headerName: "Số lần dùng",
    width: 100,
  },
  {
    field: "debt",
    headerName: "Tiền nợ",
    width: 100,
  },
  { field: "validDate", headerName: "Thời hạn", width: 150 },
  {
    field: "expiredDate",
    headerName: "Ngày hết hạn",
    width: 280,
  },

  {
    field: "createdAt",
    headerName: "Tạo ra lúc",
    width: 280,
  },
];

function CardManagerment() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [status,setStatus]=useState()
  const [message, setMessage] = useState();
  const [open, setOpen] = React.useState(false);

  const {allCard} = useSelector(state=>state.getAllCard)
  const {deactiveCard} = useSelector(state=>state.deactiveCard)
  const {activeCard} = useSelector(state=>state.activeCard)


  
  useEffect(() => {
    dispatch(getAllCard());
  }, [dispatch]);
 useEffect(()=>{
    if(deactiveCard){
        setMessage(deactiveCard.message)
        setOpen(true)
    }
    if(activeCard){
        setMessage(activeCard.message)
        setOpen(true)
    }
 },[deactiveCard,activeCard])
  useEffect(()=>{
    if(allCard){
        let filted= allCard.map(card=>{
            let time = new Date(card.validDate)
            let time1 = new Date(card.expiredDate)
            let time2 = new Date(card.createdAt)
            let arr={
                id:card._id,
                cardNumber: card.cardNumber,
                publisher: card.publisher,
                isActive: card.isActive,
                cardName: card.cardTypeId.cardName,
                cardRank: card.cardTypeId.cardRank,
                currentUsed: card.currentUsed,
                debt: card.debt,
                validDate: time,
                expiredDate:time1,
                createdAt: time2,
                
            }
            return arr
        })
        setData(filted)
    }
  },[allCard])

  const clickHandler = (params, event) => {
    setEdit(true)

    setId(params.id)
    setStatus(params.row.isActive)
};
function activeHandler(){
dispatch(activeCardAction(id))
}
function deactiveHandler(){
  dispatch(deactiveCardAction(id))
}
const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };
 
  return (
    <>
     
            <div style={{ margin: "100px 50px 10px 50px",backgroundColor:"white",minHeight:"70vh" }}>
              <div style={{ height: 400, width: "100%" }}>
                <h2 style={{ textAlign: "center" }}>Danh sách thẻ của người dùng</h2>
                
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

                {data   ? (
                  <>
                    <DataGrid
                      style={{ marginTop: "50px" }}
                      onCellDoubleClick={clickHandler}
                     
                      rows={data}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      
                    />{" "}
                  
                  </>
                ) : (
                  <Loader />
                )}
                 {
                    edit && (<>
                    {
                        status===false && ( <Button variant="contained" style={{margin:"15px 0 0 5px"}} color="success" onClick={activeHandler}>
                        Mở thẻ
                      </Button>)
                     
                    }
                    {
                           status===true && (  <Button variant="contained" style={{margin:"15px 0 0 5px",float:"right"}} color="error" onClick={deactiveHandler}>
                           Khóa thẻ
                          </Button>)
                    }
                    
                
                  </>)
                }
              </div>
            </div>
        
    </>
  );
}

export default CardManagerment;

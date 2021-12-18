import thunk from "redux-thunk"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { cardListReducer, cardDetailReducer } from "./reducers/cardReducers"
import { userLoginReducer, userRegisterReducer, userProfileReducer, userUpdatePassReducer, userGetPaymentReducer, userSubPaymentReducer, user_DT_Reducer, userForgotPassReducer } from "./reducers/userReducers"
import { initializeOrderReducer } from "./reducers/orderReducers"
import { adminLoginReducer, adminProfileReducer, adminUpdateReducer, adminPasswordReducer } from "./reducers/AdminAuthReducer"
import { adminControlUser, adminControlUserDetail, adminControlUserTransaction, adminOrderDetail, adminControlUserUpdate, adminCardCreate, adminCardView, adminCardSearch, adminCardUpdate, adminOrderAll, adminOrderApprove, adminOrderDeny } from "./reducers/AdminControlReducer"

const reducer = combineReducers({
  cardList: cardListReducer,
  cardDetail: cardDetailReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPass: userForgotPassReducer,
  userProfile: userProfileReducer,
  userUpdatePass: userUpdatePassReducer,
  userGetPayment: userGetPaymentReducer,
  userSubPayment: userSubPaymentReducer,
  user_DT_services: user_DT_Reducer,
  adminLogin: adminLoginReducer,
  initializeOrder: initializeOrderReducer,
  adminControl: adminControlUser,
  adminControlUserDetail: adminControlUserDetail,
  adminControlUserTransaction: adminControlUserTransaction,
  adminProfile: adminProfileReducer,
  notification: adminUpdateReducer,
  notiPass: adminPasswordReducer,
  notiUser: adminControlUserUpdate,
  notiCardCreate: adminCardCreate,
  adminCardView: adminCardView,
  adminCardSearch: adminCardSearch,
  adminCardUpdate: adminCardUpdate,
  adminOrderAll: adminOrderAll,
  adminOrderDetail: adminOrderDetail,
  adminOrderApprove: adminOrderApprove,
  adminOrderDeny: adminOrderDeny,

});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

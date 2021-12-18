import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import Navbar from "./components/Navbar";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import SubChargeScreen from "./Screens/conFirmScreens/SubChargeScreen";
//import TransLogScreen from "./Screens/TransLogScreen";
import WithDrawConfirmScreen from "./Screens/conFirmScreens/WithDrawConfirmScreen";
import TransferConfirmScreen from "./Screens/conFirmScreens/TransferConfirmScreen";
import CardDetail from "./components/CardDetail";
import IntCreditScreen from "./Screens/intCreditScreen";
import IntDebitScreen from "./Screens/intDebitScreen";
import DomDebitScreen from "./Screens/domDebitScreen";
import InitCardScreen from "./Screens/orderScreens/InitCardScreen";
import ForgotScreen from "./Screens/ForgotScreen";
import FindYouCard from "./Screens/FindYouCard";
import FindCardScreen from "./Screens/FindCardScreen"
import AdminScreen from "./Screens/AdminScreen"
import AdminUserControl from "./Screens/AdminUserControl"
import AdminWelcome from "./Screens/AdminWelcome";
import AdminUserDetail from "./Screens/AdminUserDetail";
import AdminUserTrans from "./Screens/AdminUserTrans";
import AdminProfile from "./Screens/AdminProfile";
import ForgotChangeScreen from "./Screens/conFirmScreens/ForgotChangeScreen";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/userActions";
import jwt_decode from "jwt-decode";
import Page404 from "./components/Page404";
import InitGateScreen from "./Screens/orderScreens/InitGateScreen";
import SupportScreen from "./Screens/orderScreens/SupportScreen";
import AdminUserTransLog from "./Screens/AdminUserTransLog";
import AdminCardCreate from "./Screens/AdminCardCreate";
import AdminCardView from "./Screens/AdminCardView";
import AdminCardUpdate from "./Screens/AdminCardUpdate";
import AdminOrderView from "./Screens/AdminOderView";
import AdminOrderDetail from "./Screens/AdminOrderDetail";

require('dotenv').config()

function App() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if (userInfo) {
    var curToken = jwt_decode(userInfo.token)
    if (curToken.exp * 1000 < Date.now()) {
      dispatch(logout())
    }
  }
  return (
    <BrowserRouter>
      <Navbar />
      <main className="py-3" style={{ marginTop: "72px" }}>
        <Routes>
          <Route path="/card/intCredits" element={<IntCreditScreen />} />
          <Route path="/card/intDebits" element={<IntDebitScreen />} />
          <Route path="/card/domDebits" element={<DomDebitScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/find/:cardname" element={<FindCardScreen />} />
          <Route path="/card/findyourcard" element={<FindYouCard />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/admin/control/user" element={<AdminUserControl />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/control/user/details" element={<AdminUserDetail />} />
          <Route path="/admin/control/user/transactionlog" element={<AdminUserTransLog />} />
          <Route path="/admin/control/user/transaction" element={<AdminUserTrans />} />
          <Route path="/admin/control/card/create" element={<AdminCardCreate />} />
          <Route path="/admin/control/card/view" element={<AdminCardView />} />
          <Route path="/admin/control/card/update/:type/:cardurl" element={<AdminCardUpdate />} />
          <Route path="/admin/control/order" element={<AdminOrderView />} />
          <Route path="/admin/control/order/detail/:id" element={<AdminOrderDetail />} />
          <Route path="/admin/welcome" element={<AdminWelcome />} />
          <Route path="/card/:cardType&:cardUrl" exact element={<CardDetail />} />
          <Route path="/card/:cardType&:cardUrl/init-card" exact element={<InitCardScreen />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/login/forgot" exact element={< ForgotScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/support" element={<SupportScreen />} />
          <Route path="/user/charge/submit" exact element={<SubChargeScreen />} />
          <Route path="/user/withdraw-money/verify" exact element={<WithDrawConfirmScreen />} />
          <Route path="/user/transfer/verify" exact element={<TransferConfirmScreen />} />
          <Route path="/user/forgot-password/verify" exact element={<ForgotChangeScreen />} />
          <Route path="/paymentgate" element={<InitGateScreen />} />
          {/* <Route path="/history" element={<TransLogScreen />} /> */}
          <Route path="*" element={<Page404 />} />
        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;

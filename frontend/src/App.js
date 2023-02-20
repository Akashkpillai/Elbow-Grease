import { Routes,Route} from 'react-router-dom'
import{BrowserRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./pages/user/Signup";
import LoginUser from "./pages/user/login";
import Home from './pages/user/home'
import AdLogin from './pages/admin/Login';
import Navbar from './components/user/Navbar/Navbar';
import ActivationEmail from './pages/user/Email';
import AdminHome from './pages/admin/AdminHome';
import UserInfo from './pages/admin/UserInfo';
import Services from './pages/user/Service';
import Book from './pages/user/Booking';
import ContactUs from './pages/user/ContactUs';
import Forgotpassword from './pages/user/Forgotpassword';
import Reset from './pages/user/Reset';
import CategoryMan from './pages/admin/CategoryMan';
import Ohome from './pages/user/Ohome';
import Profile from './pages/user/Profile';
import AddServices from './pages/admin/AddServices';
import ViewServices from './pages/admin/ViewServices';
import SignUp from './pages/Experts/SignUp';
import ExpertInfo from './pages/admin/ExpertInfo';
import ExpertPendingInfo from './pages/admin/PendingExperts';
import CheckoutSuccess from './components/user/Payment/CheckoutSuccess';
import CheckoutFailure from './components/user/Payment/CheckoutFailure';
import ProtectRoute from './components/ProtectedRoute/userProtected';
import AdminRoute from './components/ProtectedRoute/AdminProtected'
import ExpertLogin from './components/Expert/loginExpert/Expertlogin';
import ProEdit from './pages/user/ProEdit';
import ViewDeals from './pages/user/ViewDeals';
import DealDetail from './pages/user/DealDetails';
import ExDash from './pages/Experts/ExDash';
import ExEditprofile from './pages/Experts/ExEditprofile';
import ShowDeals from './components/Expert/showDeals/ShowDeals'
import GetDealDetailsbyExpert from './components/Expert/showDeals/DealAllDetails'
import ExAcceptedDeal from './pages/Experts/ExAcceptedDeal';
import ViewAccepted from './components/Expert/CompletedDeals/ViewAccepted'
import CompleteByex from './components/Expert/CompletedByEx/CompletedByex'
import ViewCompletedDetails from './components/Expert/CompletedByEx/ViewComDetails'
import ViewAllBooking from './components/admin/Booking/ViewAllBooking'
import ViewDealDetails from './pages/admin/ViewDealDetails';
import NoPage from './components/NotFound/notfound';
export default function App() {

  
  return (
    <div className='app bg-white'>
 <BrowserRouter>
 <Routes> 
 <Route path='*' element={<NoPage/>} />
 
      {/* user */}
     
     <Route path="/login"  element={<LoginUser />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/user/activate/:activation_token" element={<ActivationEmail />} />
     <Route path="/navbar" element={<Navbar />} />
     <Route path="/forgot_password" element={<Forgotpassword/>} />
     <Route path="/users/reset/:token" element={<Reset/>} />
     <Route path="/" element={<Ohome />} />
     <Route path="/services" element={<Services />} />
     <Route element={<ProtectRoute/>}>
     <Route path="/userHome" element={<Home />} />
     <Route path="/booking" element={<Book/>} />
     <Route path="/contact" element={<ContactUs/>} />
     <Route path="/profile" element={<Profile/>} />
     <Route path="/checkout-success" element={<CheckoutSuccess/>} />
     <Route path="/checkout-failed" element={<CheckoutFailure/>} />
     <Route path="/editProfile" element={<ProEdit/>} />
     <Route path="/deal" element={<ViewDeals/>} />
     <Route path="/deal-deatails" element={<DealDetail/>} />
     </Route>


      {/* admin */}
     <Route path="/admin" element={<AdLogin />} />
     <Route element={<AdminRoute/>}>
     <Route path="/admin/home" element={<AdminHome />} />
     <Route path="/admin/user" element={<UserInfo />} />
     <Route path="/admin/category" element={<CategoryMan />} />
     <Route path="/admin/service" element={<ViewServices />} />
     <Route path="/admin/addService" element={<AddServices />} />
     <Route path="/admin/expert" element={<ExpertInfo />} />
     <Route path="/admin/expertPending" element={<ExpertPendingInfo />} />
     <Route path="/admin/booking" element={<ViewAllBooking />} />
     <Route path="/admin/deal-alldetails" element={<ViewDealDetails />} />
     </Route>


      {/* expert */}
     <Route path="/experts/signup" element={<SignUp />} />
     <Route path="/experts/login" element={<ExpertLogin />} />
     <Route path="/experts/dashboard" element={<ExDash />} />
     <Route path="/experts/edit-profile" element={<ExEditprofile />} />
     <Route path="/expert/view-Deals" element={<ShowDeals />} />
     <Route path="/experts/deal-deatails" element={<GetDealDetailsbyExpert />} />
     <Route path="/experts/accepted-deal" element={<ExAcceptedDeal />} />
     <Route path="/experts/accepted-deal-details" element={<ViewAccepted />} />
     <Route path="/experts/completed-deal" element={<CompleteByex />} />
     <Route path="/experts/completed-deal-details" element={<ViewCompletedDetails />} />













 </Routes>
 </BrowserRouter> 
    </div>
  )
}

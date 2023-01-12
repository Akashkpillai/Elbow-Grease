import { Routes,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import{BrowserRouter} from 'react-router-dom'
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

export default function App() {



  
  return (
    <div className='app bg-white'>
 <BrowserRouter>
 <Routes> 
     <Route path="/login"  element={<LoginUser />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/user/activate/:activation_token" element={<ActivationEmail />} />
     <Route path="/navbar" element={<Navbar />} />
     <Route path="/" element={<Home />} />
     <Route path="/services" element={<Services />} />
     <Route path="/booking" element={<Book/>} />
     <Route path="/contact" element={<ContactUs/>} />
     <Route path="/forgot_password" element={<Forgotpassword/>} />
     <Route path="/users/reset/:token" element={<Reset/>} />

     





     <Route path="/admin" element={<AdLogin />} />
     <Route path="/admin/home" element={<AdminHome />} />
     <Route path="/admin/user" element={<UserInfo />} />
     <Route path="/admin/category" element={<CategoryMan />} />




 </Routes>
 </BrowserRouter> 
 <ToastContainer />    
    </div>
  )
}

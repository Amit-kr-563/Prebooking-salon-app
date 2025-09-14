import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import LanguageSelector from "./context/LanguageSelector";
import RegisterPage from "./pages/RegisterPage";
import UserRegister from "./pages/UserRegister";
import Nav from "./components/Nav";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import UserDashboard from "./pages/UserDashboard";
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard";

import SearchResults from "./pages/SearchResults";
import SalonRegistration from "./aaa/SalonRegistration";
import Booking from "./pages/Booking";
import AboutUs from "./pages/AboutUs";
import Help from "./pages/Help";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Payment from "./pages/Payment";
import MyBookings from "./pages/user/MyBookings";
import MySalonBookings from "./pages/salon/MySalonBooking";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <>
      <LanguageSelector />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register/shop" element={<SalonRegistration />} />
        <Route path="/login" element={<Login />} />

        <Route path="/results" element={<SearchResults />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/shop" element={<SalonRegistration />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/shopkeeper/dashboard" element={<ShopkeeperDashboard />} />
        <Route path="/booking/:salonId" element={<Booking />} />
        <Route path="/booking/:salonId/payment" element={<Payment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-booking" element={<MyBookings />} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './productManagment/AddProduct';
import ViewProduct from './productManagment/ViewProduct';
import AdminView from './productManagment/AdminView';
import SkinToneDetector from './skinToneDetector/SkinToneDetector';
import FrontPage from './pages/FrontPage'
import '../src/styles.css';
import TryOneFull from './pages/TryOneFull';
import Login from './Components_S/Login';
import Profile from './Components_S/Profile';
import Register from './Components_S/Register';
import CustomerDetails from './Components_S/CustomerDetails';
import Review from "./pages/Review";
import ReviewForm from "./pages/formreview";
import ReviewList from "./pages/listreview";
import ReviewView from "./pages/reviewview";
import UserReview from "./pages/Userreviewlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-product" element={<ViewProduct />} />
        <Route path="/admin-product" element={<AdminView />} />
        <Route path="/skinToneDetector" element={<SkinToneDetector />} />
        <Route path="/tryon" element={<TryOneFull />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerDetails" element={<CustomerDetails />} />

        <Route path="review" element={<Review/>} />
        <Route path="/formreview" element={<ReviewForm/>}/>
        <Route path="/listreview" element={<ReviewList/>}/>
        <Route path="/reviewview" element={<ReviewView/>}/>
        <Route path="//Userreviewlist" element={<UserReview/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;

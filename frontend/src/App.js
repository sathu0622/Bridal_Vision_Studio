import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './productManagment/AddProduct';
import ViewProduct from './productManagment/ViewProduct';
import AdminView from './productManagment/AdminView';
import SkinToneDetector from './skinToneDetector/SkinToneDetector';
import FrontPage from './pages/FrontPage'
import '../src/styles.css';
import TryOneFull from './pages/TryOneFull';



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
      </Routes>
    </Router>
  );
}

export default App;

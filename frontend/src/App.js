import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './productManagment/AddProduct';
import ViewProduct from './productManagment/ViewProduct';
import '../src/styles.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the Product Management App</h1>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-product" element={<ViewProduct />} />
      </Routes>
    </Router>
  );
}

export default App;

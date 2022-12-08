import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CryptoDetails from "./components/CryptoDetails";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/coins/:coinId' element={<CryptoDetails />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

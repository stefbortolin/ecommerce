import './App.css';
import NavBar from './components/NavBar'
import CheckoutPage from './components/CheckoutPage'
import {Routes, BrowserRouter as Router, Route} from "react-router-dom"
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './pages/home/Home';
import AgregarProducto from './pages/AgregarProducto';
import EliminarProducto from './pages/EliminarProducto';
import EditarProducto from './pages/EditarProducto';
import AuthGuards from './components/guards/auth-guards';
import Checkout from './components/CheckoutForm/Checkout';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:cat" element={<Home/>} />
            <Route element={<AuthGuards/>}>
              <Route path="/agregarproducto" element={<AgregarProducto/>} />
              <Route path="/eliminarproducto" element={<EliminarProducto/>} />
              <Route path="/editarproducto/:id" element={<EditarProducto/>} />
            </Route>
            <Route path="/checkout-page" element={<CheckoutPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

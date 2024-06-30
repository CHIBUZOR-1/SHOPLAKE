import { Routes, Route } from 'react-router-dom';
import Hompage from './Pages/Hompage';
import About from './Pages/About';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
import PageNotFound from './Pages/PageNotFound';
import CartPage from '../src/Pages/Cartlog/CartPage';
import Forgotpassword from './Pages/Forgotpassword';
import Dashboard from './Pages/User/Dashboard';
import UserRoute from './Components/Routes/UserRoute';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddProduct from './Pages/Admin/AddProduct';
import AllUsers from './Pages/Admin/AllUsers';
import AllProducts from './Pages/Admin/AllProducts';
import Orders from './Pages/Admin/Orders';
import Profile from './Pages/User/Profile';
import Orderz from './Pages/User/Orderz';
import Productpage from './Pages/Productpage';
import PlaceOrder from './Pages/Checkout/PlaceOrder';
import Search from './Pages/Search/Search';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hompage/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Login" element={<Loginpage/>}/>
        <Route path="/dashboard" element={<UserRoute/>}>
          <Route path="user" element={<Dashboard />}>
            <Route path='profile' element={<Profile/>} />
            <Route path='orders' element={<Orderz/>} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />}>
            <Route path='create-product' element={<AddProduct/>}/>
            <Route path='all-products' element={<AllProducts/>}/>
            <Route path='all-users' element={<AllUsers/>} />
            <Route path='all-orders' element={<Orders/>} />
          </Route>
        </Route>
        <Route path="/Register" element={<Registerpage/>}/>
        <Route path='/product_category/:category' element={<CategoryProducts/>} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/search' element={<Search/>} />
        <Route path="/product" element={<Productpage/>}>
            <Route path=':id' element={<Productpage/>} />
        </Route>
        <Route path="/Reset Password" element={<Forgotpassword/>}/>
        <Route path="/*" element={<PageNotFound/>}/>

      </Routes>
    </>
  );
}

export default App;

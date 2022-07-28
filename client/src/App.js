import React,{useEffect} from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import RegisterLogin from './Components/Register';
// import PrivateRoute from './privateroutes/PrivateRoute';
import AdminMenu from './Components/AdminMenu';
// import { useSelector } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import ProductsScreen from './Components/ProductsScreen';
import DisplayCategories from './Components/DisplayCategories';
import { useAuth } from './hooks/useAuth';
import AddProduct from './Components/AddProduct';
import UsersSecreen from './Components/UsersSecreen';
import AddCategory from './Components/AddCategory';
import OrderSecreen from './Components/OrderSecreen';


function App() {
  const {isAdmin} = useAuth();


useEffect(() => {
     const cart = localStorage.getItem('cart')
     if(!cart){
      localStorage.setItem('cart', JSON.stringify([]))
     }
}, [])

  return (
    <div className="App">
    {/* { <Navbar/> } */}
   {isAdmin && <AdminMenu/>}
    <Route  exact path='/'  component={Home}  />
    <Route  exact path='/products'  component={ProductsScreen} />
    <Route  exact path='/orders'  component={OrderSecreen} />
    <Route  exact path='/categories'  component={AddCategory} />
    {/* <Route  exact path='/categories'  component={DisplayCategories} /> */}
    

    <Route  exact path='/add-product/:id'  component={AddProduct} />
    <Route  exact path='/add-product'  component={AddProduct} />
    <Route  exact path='/Users'  component={UsersSecreen} />
    

    <Route path='(/SignUp|/SignIn)'  component={RegisterLogin}     />
    
    </div>
  );
}

export default App;

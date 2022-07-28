import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import { logout } from '../redux/Actions/useractions'
function Navbar() {
    const auth = useSelector(state => state.UserReducer.auth)
    const dispatch= useDispatch()
    return (
        <div>

                  {auth ?  <div class="navMenu">
                    <Link  to='/' >  <a className="logo" href="#">🍔</a> </Link>
                    <Link  to='/SignIn' >  <a href="#" onClick={()=>dispatch(logout())}  >LOGOUT</a> </Link>
                  </div> :
                  <div class="navMenu">
              <Link  to='/' >  <a className="logo" href="#">🍔</a> </Link>      
          {/* <Link  to='/SignUp' >   <a href="#">Sign Up</a></Link> */}
          <Link  to='/SignIn' >   <a href="#">👤</a></Link> 
                      </div>  }
        </div>
    )
}

export default Navbar

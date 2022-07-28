import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearerrors, login, register } from '../redux/Actions/useractions'
import {useHistory, Link} from "react-router-dom"

import "./Register.css";

function RegisterLogin() {
  const [regname,setregname]=useState("")
  const [regemail,setregemail]=useState("")
  const [regpassword,setregpassword]=useState("")
  const [sigemail,setsigemail]=useState('')
  const [sigpassword,setsigpassword]=useState('')
  const dispatch = useDispatch()
  const history=useHistory()

const [loginView, setLoginView] = useState(true);
useEffect(() => {
  
    const token = localStorage.getItem('token')
    console.log(token)

    if(token){
      history.push('/')
    }
}, [])


    return (


        <div className='loginWrapper'>



{loginView ? 

(<div className='loginForm'>
  <Link  to='/' > 
   <h1 className='logoBrand'>
      <img src="https://i.pinimg.com/originals/2c/2e/8c/2c2e8cc2269e65efbdb7fed6f5a2abf6.gif" />
     </h1> 
   </Link>
  <input placeholder='Email' type="text" className='email' value={sigemail} onChange={(e)=>{ setsigemail(e.target.value); dispatch(clearerrors())}  }/>
  <input placeholder='Password' type="password" className='password' value={sigpassword} onChange={(e)=> {setsigpassword(e.target.value); dispatch(clearerrors())}  } />
      <button onClick={()=>dispatch(login({email:sigemail, password:sigpassword},history))}>Login</button>
      <span>Don't have an account ? <b style={{cursor:"pointer"}} onClick={() => setLoginView(false)}>Signup her</b> </span>
</div>) : 


(<div className='loginForm'>
  <Link  to='/' > 
   <h1 className='logoBrand'>
      <img src="https://i.pinimg.com/originals/2c/2e/8c/2c2e8cc2269e65efbdb7fed6f5a2abf6.gif" />
     </h1> 
    </Link>

  <input placeholder='Username' type="text" className='username' value={regname}  onChange={(e)=>setregname(e.target.value)}/>
 
  <input placeholder='Email' type="text" className='email' value={regemail}  onChange={(e)=>setregemail(e.target.value)} />
  
  <input placeholder='Password' type="password" className='password' value={regpassword}  onChange={(e)=>setregpassword(e.target.value)} />
      <button onClick={()=>dispatch(register({name:regname,password:regpassword,email:regemail},history))} >Register</button>
      <span >Already have an account ? <b style={{cursor:"pointer"}} onClick={() => setLoginView(true)}>Sign in her</b> </span>
</div>)
}


</div>
    )
}

export default RegisterLogin

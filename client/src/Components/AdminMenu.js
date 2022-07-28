import React from 'react'
import { Menubar } from 'primereact/menubar';
import { useHistory } from "react-router-dom";
import { logout } from '../redux/Actions/useractions'
import { useDispatch } from 'react-redux'




const AdminMenu = () => {
    const history = useHistory();
    const dispatch= useDispatch()

    const items = [
        {
           label:'Products',
           icon:'pi pi-fw pi-file',
           command: () => {
              history.push('/products')
        }
        },
        {
           label:'Categories',
           icon:'pi pi-fw pi-pencil',
           command: () => {
            history.push('/categories')     
           

       }
        },
        {
           label:'orders',
           icon:'pi pi-fw pi-user',
           command: () => {
            history.push('/orders')
         }
          
        },
        {
           label:'users',
           icon:'pi pi-fw pi-calendar',
           command: () => {
            history.push('/Users')
         }
        },
        {
           label:'Quit',
           icon:'pi pi-fw pi-power-off',
            command: () => {
            dispatch(logout())
            history.push('/SignIn')
        }
         
}];

  return (
    <Menubar model={items}/>
  )
}

export default AdminMenu

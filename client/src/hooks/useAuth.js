import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const user = useSelector((state) => { 
        console.log(state.UserReducer)
        return state.UserReducer.user});
    const [isAdmin, setIsAdmin] = useState()

    useEffect(() => {
        console.log("User role", user?.role)
        setIsAdmin(user?.role === 'admin');
    }, [user])


    return {
        isAdmin
    }
}
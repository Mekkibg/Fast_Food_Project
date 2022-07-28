import React,{useState,useEffect} from 'react'
import axios from 'axios'
const DisplayCategories = () => {

    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        axios
          .get("/categories")
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      };
      useEffect(() => {
        getCategories()
      }, [])
  return (
    <div>
        {categories.map(el=> <li>{el.name}</li>)} 
     
    </div>
  )
}
export default DisplayCategories


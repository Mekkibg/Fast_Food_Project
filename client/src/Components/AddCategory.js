import React,{useState} from 'react'
import axios from "axios";
import { InputText } from "primereact/inputtext";
const AddCategory = () => {
  const [name,setName] = useState('')  
  const [description,setDescription] = useState('')
  const addCategories = () => {
    axios
      .post("/categories/create",{name,description})
      
      .catch((err) => {
        console.log(err.response.data);
      });
  };


    return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'20%',marginLeft:"40rem", marginTop:'10rem'}}>
        <label> Add New Category</label>
      
        <br/>


      <InputText
          
          name='name'
       
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="name"
        />
        <br/>
        <InputText
          
          name='description'
      onChange={(e)=>setDescription(e.target.value)}
      value={description}
          placeholder="description"
        />
                <br/>

         <button onClick={addCategories}> Add</button>
    </div>
  )
}

export default AddCategory

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

const AddProduct = () => {
  const history = useHistory();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [initialValues, setInitialValues] = useState({
    _id: null,
    name: null,
    description: null,
    price: null,
    _category: null,
  });

  const addProductForm = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (val) => {
      console.log(val);
      val?._id ? updateProductApi() : AddProductApi();
    },
  });

  useEffect(() => {
    if(id) {
      getProdById();
    }
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("/categories")
      .then((res) => {
        //console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const getProdById = () => {
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setInitialValues({
          ...initialValues,
          ...res.data
        })
      })
      .catch((err) => {
        console.log(err.response.data);
      });
   }


  const AddProductApi = () => {
    axios
      .post("/products/create", addProductForm.values)
      .then(() => {
        history.push('/products')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const updateProductApi = () => {
    axios
      .patch(`/products/update/${id}`, addProductForm.values)
      .then(() => {
        history.push('/products')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      
        marginLeft:'40rem',
        width: "20%",
        marginTop: "10rem",
      }}
    >
      <span >
        <InputText
          id="name"
          defaultValue={initialValues.name}
          onChange={addProductForm.handleChange("name")}
          placeholder="name"
        />
        
        {/* <label htmlFor="name">Name</label> */}
      </span>
      <span>
      <br/>
        <InputNumber
          value={addProductForm.values.price}
          onValueChange={addProductForm.handleChange("price")}
          currency="TND"
          mode="currency"
          id="price"
          placeholder="price"
        />
        
        {/* <label htmlFor="price">Price</label> */}
      </span>
      <span>
      <br/>
        <InputTextarea
          rows={5}
          cols={30}
          id="description"
          initialValues={initialValues.description}
          onChange={addProductForm.handleChange("description")}
          autoResize
          placeholder="description"
        />
        
        {/* <label htmlFor="description">Description</label> */}
      </span>
      <br/>
      Categorie:
      <Dropdown
        dataKey="_id"
        value={addProductForm.values._category}
        options={categories}
        optionLabel="name"
        optionValue="_id"
        onChange={(e) => addProductForm.setFieldValue("_category", e.value)}
        placeholder="Select a category"
      />
      <br/>
      <button onClick={addProductForm.handleSubmit}>Add Product</button>
    </div>
  );
};

export default AddProduct;

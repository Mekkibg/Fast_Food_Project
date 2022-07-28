import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";


export function ProductsScreen({ navigation }) {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState(null);
 
  const deleteProduct = (id) => {
    axios.delete(`remove/${id}`);
    getProds();
  };
  
  useEffect(() => {
    getProds();
  }, []);

  const getProds = () => {
    axios
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };


  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        alt={rowData.image}
        width="50px"
        height="50px"
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
    <div>
    <Button onClick={() => {
      history.push(`/add-product/${rowData._id}`)
    }}
     type="button" icon="pi pi-cog"></Button> 
     <Button
        onClick={() => {
          deleteProduct(rowData._id);
          console.log("btn clicked", rowData._id);
        }}
        type="button"
        icon="pi pi-trash"
      ></Button> 
        </div>
      );
    
  };

  return (
    <div>
    <button onClick={() => {history.push(`/add-product`)}}>Add Product</button>
    
    <DataTable
      value={products}
      paginator
      rows={10}
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[10, 25, 50]}
      dataKey="_id"
      rowHover
      selection={selectedItems}
      onSelectionChange={(e) => setSelectedItems(e.value)}
    >
      <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
      <Column field="_id" header="id"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="_category.name" header="Category"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="image" header="Image" body={imageBodyTemplate}></Column>
      <Column
        headerStyle={{ width: "4rem", textAlign: "center" }}
        bodyStyle={{ textAlign: "center", overflow: "visible" }}
        body={actionBodyTemplate}
      />

    </DataTable>
    </div>
  );
}

export default ProductsScreen;

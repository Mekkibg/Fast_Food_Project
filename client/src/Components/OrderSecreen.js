import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Button } from "primereact/button";

export function OrderSecreen({ navigation }) {

  const [oders, setOders] = useState([]);

  
  
  useEffect(() => {
    getOders();
  }, []);
  
  const getOders = () => {
    axios
      .get("/orders")
      .then((res) => {
        setOders(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
   
  return (
    <div>
      <div className="card">
                
                <DataTable 
                value={oders} 
                responsiveLayout="scroll">
                    <Column field="buyer" header="Buyer" sortable></Column>
                   
                    <Column field="date" header="Date" sortable></Column>
                    <Column field="_id" header="List" sortable></Column>
                    <Column field="data.name" header="order" sortable></Column>
                </DataTable>
            </div>
    </div>
  )
  }
export default OrderSecreen

import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Button } from "primereact/button";

export function UsersSecreen({ navigation }) {

  const [users, setUsers] = useState([]);
  const [selectedItems, setSelectedItems] = useState(null);

  const deleteUser = (id) => {
    axios.delete(`delete/${id}`);
    getUsers();
  };
  useEffect(() => {
    
    getUsers();
  }, []);
  
  const getUsers = () => {
    axios
      .get("/read")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const actionBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
      <Button
        onClick={() => {
          deleteUser(rowData._id);
        }}
        type="button"
        icon="pi pi-trash"
      ></Button>
    );
  };

  return (
    <div>
      <DataTable
        value={users}
        paginator
        rows={10}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10]}
        dataKey="_id"
        rowHover
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
      >
        <Column field="email" header="Email"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="role" header="Role"></Column>
        <Column
          headerStyle={{ width: "4rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  );
}

export default UsersSecreen;

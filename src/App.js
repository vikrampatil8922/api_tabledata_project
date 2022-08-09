import React from 'react';
import "./App.css"
import Table from './components/Table';


const App = () => { 

  const columns = [
    { field: "id", header: "id" },
    { field: "name", header: "Name" },
    { field: "username", header: "Username" },
    { field: "email", header: "Email" }
  ];
  const filterField = [
    { type: "text", header: "Sr" },
    { field: "text", header: "Name" },
    { field: "text", header: "Username" },
    { field: "text", header: "Email" }
  ];

  return (
    <>   
     <Table columns ={columns} filterField ={filterField}/>
    </>
  );
};


export default App;


import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
// import MyTable from './MyTable';
import ClipLoader from "react-spinners/ClipLoader";

const { ipcRenderer } = window.require('electron');
const MyTable = React.lazy(() => import('./MyTable'))

function ThreeMonthClients(){
    
    const [threeMonthClients, setThreeMonthClients] = useState([]);
    useEffect(()=>{
        ipcRenderer.send("send_threeMonths_data");
        ipcRenderer.on("sending_threeMonths_data", (event, data)=>{
          if(data){ 
          setThreeMonthClients([...data]);
          }
        })
      }, [])

     
  //Defining Columns
  const columns = [
    {
      title:"Emri", field:"emri",searchable:false
    },{
      title:"Mbiemri", field:"mbiemri",searchable:false
    },
    {
      title:"Valid Nga Data", field:"data_prej", searchable:false
    },
    {
      title:"Deri Ne Datën", field:"data_deri",searchable:false
    },
    {
      title:"Cmimi", field:"cmimi",searchable:false
    },
    {
      title:"Datëlindja", field:"datelindja",searchable:false
    }
  ]


  
  return(


      <React.Fragment>
                      <React.Suspense fallback = { <ClipLoader  loading={true}  size={150} />}>
          <div style = {{width:'93vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h1 style = {{color:'black', borderBottom:'2px solid gray'}}>Klientët Mbi 3 Muaj: {threeMonthClients.length}</h1>

     <div style={{width:'100%'}}>
     <MyTable 
      data = {threeMonthClients ? [...threeMonthClients] : []}
      columns = {columns?[...columns]:[]}
      />
    </div>

    </div>
    </React.Suspense>
    </React.Fragment>
  )
}

export default ThreeMonthClients;
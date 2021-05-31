import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
// import MyTable from './MyTable';
import FotoDialog from '../Dialogs/FotoDialog';
import ClipLoader from "react-spinners/ClipLoader";

const { ipcRenderer } = window.require('electron');
const MyTable = React.lazy(() => import('./MyTable'))


function NotPaidClients(){
  const [notPaidClients, setNotPaidClients] = useState([]);


useEffect(()=>{
  ipcRenderer.send("send_notPaid_data");
  ipcRenderer.on("sending_notPaid_data", (event, data)=>{
    if(data){
   setNotPaidClients([...data])
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
      title:"Valid Nga Data", field:"data_prej",searchable:false
    },
    {
      title:"Deri Në Datën", field:"data_deri",searchable:false
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
          <h1 style = {{color:'black', borderBottom:'2px solid gray'}}>Klientët Pa Pagesë:  {notPaidClients.length}</h1>

     <div style={{width:'100%'}}>
     
      <MyTable 
      data = {notPaidClients ? [...notPaidClients] : []}
      columns = {columns?[...columns]:[]}
      />
    </div>

    </div>
    </React.Suspense>

    </React.Fragment>
  )
}

export default NotPaidClients;
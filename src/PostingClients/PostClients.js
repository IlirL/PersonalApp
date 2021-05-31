import React, { Suspense } from 'react';
import MaterialTable from 'material-table'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table } from '@material-ui/core';
import MyFormUpdate from '../Form/MyFormUpdate';
import MyForm from '../Form/MyForm';
import PersonIcon from '@material-ui/icons/Person';
import RegisterDialog from '../Dialogs/RegisterDialog';
import InfoIcon from '@material-ui/icons/Info';
import ClientHistoryDialog from '../Dialogs/ClientHistoryDialog';
// import MyTable from './MyTable'
import FotoDialog from '../Dialogs/FotoDialog';
import EditDialog from '../Dialogs/EditDialog';
import DeleteDialog from '../Dialogs/DeleteDialog';
import ClipLoader from "react-spinners/ClipLoader";
const MyTable = React.lazy(() => import('./MyTable'))

const { ipcRenderer } = window.require('electron');


function PostClients(){
  

  const [clients, setClients] = React.useState([]);

React.useEffect(()=>{
  ipcRenderer.send("send_whole_data");
  ipcRenderer.on("sending_whole_data", (event, data)=>{
    console.log('data = ', data);
   if(data)
     setClients(() => [...data])
  })
}, [])


  //Defining Columns
  const columns = [
    {
      searchable:false,
      field: 'foto_path',
      title: 'Foto',
      render: rowData => <Button
      onClick = {() => {
       ipcRenderer.send('open_foto_dialog', rowData.foto_path);
      }}
      variant = 'outlined'
    >Foto</Button>
    },
    {
      title:"Emri", field:"emri"
    },{
      title:"Mbiemri", field:"mbiemri"
    },
    {
      title:"Valid Nga Data", field:"data_prej", searchable:false
    },
    {
      title:"Deri Në Datën", field:"data_deri", searchable:false
    },
    {
      title:"Cmimi", field:"cmimi", searchable:false
    },
    {
      title:"Datëlindja", field:"datelindja", searchable:false
    }
  ]

  
  return( 
      <React.Fragment>
        <React.Suspense fallback = { <ClipLoader  loading={true}  size={150} />}>
          <div style = {{width:'93vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h1 style = {{color:'black', borderBottom:'2px solid gray'}}>Klientët:  {clients.length}</h1>
     
     <div style={{width:'100%'}}>
      <div style = {{display: "flex", justifyContent:"flex-end" }}><Button style= {{
        background: "#1a504c"
        ,border:"1px solid black", color:"white", display:'flex', alignItems:'center', width:"130px", marginBottom:"10px"}}
        onClick ={ () => {
          ipcRenderer.send('open_register_dialog')

        }}> <AddIcon style = {{color:'white', marginRight:"5px"}} />KLIENT</Button></div>
      

      <MyTable 
      data = {clients?[...clients] : []} 
      columns = {columns?[...columns]:[]} 
      actions ={[
        {
          icon:EditIcon,
          tooltip: 'Pagesa Rradhes',
          onClick:(event, rowData) =>{      
            ipcRenderer.send('open_edit_dialog', rowData);
          }
        },
        {
          icon:InfoIcon,
          tooltip: 'Historia Klientit',
          onClick:(event, rowData) =>{
            ipcRenderer.send('open_client_history', rowData);

          }
        },
        
        rowData => ({
          icon:DeleteIcon,
          tooltip: 'Fshij Klientin',
          onClick: (event, rowData) =>  {  
            ipcRenderer.send('open_delete_dialog', rowData);
          }
        })
      ]}
      

      />
    
    </div>

    </div>
    </React.Suspense>
    </React.Fragment>
    )
}


export default PostClients;
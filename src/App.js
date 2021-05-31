import React, { Suspense, useEffect, useState } from 'react'
import MyForm from './Form/MyForm'
import MyNavbar from './MyNavbar'

import {MemoryRouter as Router, Link, Switch, Route} from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import ClientInfo from './ClientInfo'

import PostClients from './PostingClients/PostClients'
import NotPaidClients from './PostingClients/NotPaidClients'
import ThreeMonthClients from './PostingClients/ThreeMonthClients'
import PaidClients from './PostingClients/PaidClients'
import RegisterDialog from './Dialogs/RegisterDialog';
import FotoDialog from './Dialogs/FotoDialog';
import EditDialog from './Dialogs/EditDialog';
import DeleteDialog from './Dialogs/DeleteDialog';
import ClientHistoryDialog from './Dialogs/ClientHistoryDialog';

const { ipcRenderer } = window.require('electron');



function App() {
  
  console.log('App component')

  return (
     <Router>
      <div style = {{
        height:'100vh', 
        background: 'linear-gradient(-45deg, rgba(32,101,95,1) 0%, rgba(58,177,176,1) 50%, rgba(32,101,95,1) 100%)',
        overflow:'hidden'}}
        >
      <MyNavbar/> 
        
        <RegisterDialog />
        <FotoDialog />
        <EditDialog />
        <DeleteDialog />
        <ClientHistoryDialog />
      <div style = {{display:'flex', justifyContent:'center'}}>     
      <Switch>
        <Route path = '/post_clients' exact render = {() => <PostClients/>}></Route>
        <Route path = "/not_paid_clients"  component = {NotPaidClients}></Route>
        <Route path = "/three_month_clients" component = {ThreeMonthClients}></Route>
        <Route path = "/paid_clients"  component = {PaidClients}></Route>
      </Switch>
      </div>

      </div>
      </Router>
  )
}

export default App
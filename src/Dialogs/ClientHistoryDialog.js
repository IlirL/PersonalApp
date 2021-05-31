import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import ClientInfo from '../ClientInfo'

const { ipcRenderer } = window.require('electron');

function ClientHistoryDialog() {
    console.log('History Component')

    const [historyShow, setHistoryShow] = React.useState(false);
    const personChosen = React.useRef({});

    ipcRenderer.once('opening_client_history', (event, person_chosen) =>{
        personChosen.current = {...person_chosen};
        console.log('history person chosen = ', personChosen.current)
        setHistoryShow(true);
    })
    
    return (
        <Dialog 
        open={historyShow} 
        onClose={() => setHistoryShow(() => false)} 
        aria-labelledby="Regjistro Klientin"
        // style = {{height:''}}
        >
        <DialogTitle id="alert-dialog-title">Historia E Klientit</DialogTitle>
        <DialogContent>
          <ClientInfo personChosen = {{...personChosen.current}}/>
          </DialogContent>
         </Dialog>
    )
}

export default ClientHistoryDialog

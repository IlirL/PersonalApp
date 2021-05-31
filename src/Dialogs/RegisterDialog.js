import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import MyForm from '../Form/MyForm'
const { ipcRenderer } = window.require('electron');
function RegisterDialog() {
    const [openRegister, setOpenRegister] = React.useState(false);

    ipcRenderer.once('opening_register_dialog', () => {
        setOpenRegister(true);
    })

    
    return (
        <Dialog open={openRegister} onClose={() => setOpenRegister(() => false)} aria-labelledby="Regjistro Klientin">
        <DialogTitle id="form-dialog-title">Regjistro</DialogTitle>
        <DialogContent>
          <MyForm setOpenRegister = {setOpenRegister}/>
          </DialogContent>
         </Dialog>
    )
}

export default RegisterDialog

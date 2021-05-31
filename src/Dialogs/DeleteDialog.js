import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react'

const { ipcRenderer } = window.require('electron');

function DeleteDialog() {
    // console.log(deleteConfirm);
  console.log('Delete Component')
    const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const personChosen = React.useRef({});
    ipcRenderer.once('opening_delete_dialog', (event, person_chosen) =>{
      personChosen.current = {...person_chosen};
      setDeleteConfirm(true);
    })
    return (
       <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmim per fshirjen e Klientit</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A je i sigurt per fshirjen e Personit:<b> {`${personChosen.current.emri}  ${personChosen.current.mbiemri}`}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{
           ipcRenderer.send('Delete_user', {id:personChosen.current.id, foto_path:personChosen.current.foto_path});
           setDeleteConfirm(false);
          }} color="primary">
            Po
          </Button>
          <Button 
          onClick={() => setDeleteConfirm(false)} 
          color="primary" autoFocus>
             Jo
          </Button>
        </DialogActions>
      </Dialog> 
    )
}

export default DeleteDialog

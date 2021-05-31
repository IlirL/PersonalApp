import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import MyFormUpdate from '../Form/MyFormUpdate'
const { ipcRenderer } = window.require('electron');

// function EditDialog({edit, setEdit, id, emri, mbiemri, datelindja, cmimi, foto_path}) {
    function EditDialog() {
      console.log('Edit Component')

    const [openEdit, setOpenEdit] = React.useState(false);
    const personChosen = React.useRef({});

    ipcRenderer.once('opening_edit_dialog', (event, person_chosen) => {
      personChosen.current = {...person_chosen}
      setOpenEdit(true);
    })
    
      console.log("EditDialog = ", personChosen)
        return (
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)} aria-labelledby="Regjistro Klientin">
        <DialogTitle id="form-dialog-title">Regjistro</DialogTitle>
        <DialogContent>
          <MyFormUpdate
          id = {personChosen.current.id}
          setOpenRegister = {setOpenEdit} 
          emri = {personChosen.current.emri} 
          mbiemri = {personChosen.current.mbiemri}  
          datelindja = {personChosen.current.datelindja}
          cmimi = {personChosen.current.cmimi}
          foto_path = {personChosen.current.foto_path}
          />
          </DialogContent>
      </Dialog>
    )
}

export default EditDialog

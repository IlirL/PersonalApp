import { Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
const { ipcRenderer } = window.require('electron');

function FotoDialog() {
  console.log('Foto Component')

  const [openFoto, setOpenFoto] = React.useState(false);
  const fotoUrl = React.useRef('');

  ipcRenderer.once('opening_foto_dialog', (event, foto_path) =>{
    fotoUrl.current = foto_path;
    console.log('')
    setOpenFoto(true)
  })

  return (
        <Dialog open={openFoto} onClose={() => setOpenFoto(false)}>
        <DialogContent>
          <img src={fotoUrl.current} alt="" style = {{width:"100%", height:'100%'}}/>
          </DialogContent>
      </Dialog>

    )
}

export default FotoDialog

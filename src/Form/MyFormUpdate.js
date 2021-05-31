import React from 'react'

import { Grid, Input, makeStyles, Typography, Container, Paper, Button, Avatar } from '@material-ui/core';
import * as Yup from 'yup'
import {Formik, Form, useFormikContext} from 'formik'
import TextFieldWrapper from './TextFieldWrapper'
import DateTimePicker from './DataTimePicker';
import ButtonWrapper from './ButtonWrapper';

const { ipcRenderer } = window.require('electron');


const useStyles = makeStyles((theme) =>({
    formWrapper:{
        marginTop: theme.spacing(5),
        marginBottom:theme.spacing(8),
    }
}))

var INITIAL_FORM_STATE = {
    emri:'',
    mbiemri:'',
    data_prej:'',
    data_deri:'',
    cmimi: '',
    datelindja:'',
}

const FORM_VALIDATION = Yup.object().shape({
    emri: Yup.string().required('Emri  i patjetersueshem'),
    mbiemri: Yup.string().required('Mbiemri i patjetersueshem'),
    data_prej:Yup.date().required('Data e patjetersueshme'),
    data_deri:Yup.date().required('Data e patjetersueshme'),
    cmimi: Yup.number(),
    datelindja:Yup.string(),
})

function MyFormUpdate({id,setOpenRegister, emri, mbiemri, datelindja,cmimi, foto_path}) {
    
    const [foto, setFoto] = React.useState("Ndrysho Foton");
    const [color, setColor] = React.useState('#2883c1')
    if(emri && mbiemri)
    {
        INITIAL_FORM_STATE = {
            "emri":emri,
            "mbiemri":mbiemri,
            "data_prej":'',
            "data_deri":'',
            "cmimi":cmimi,
            "datelindja":datelindja
        }
    }
    
    
    const takeDataToBase = ((values) => {   
        let isOneMonth = true;
       let days = (new Date(values.data_deri).getTime() - new Date(values.data_prej)) /  (24*60*60*1000);

        if(days > 80)
            isOneMonth = false;

            var changed_foto = false;
        var newClient = {
            id:id,
            emri:values.emri,
            mbiemri:values.mbiemri,
            data_prej:values.data_prej,
            data_deri:values.data_deri,
            oneMonth:isOneMonth,
            cmimi:values.cmimi,
            datelindja:values.datelindja,
            valid:true,
        }
        ipcRenderer.send('edit_person', newClient);
    }

    
   )

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs = {12}>
                <Container maxWidth = "md">
                    <div className={classes.formWrapper}>

                        <Formik
                        initialValues = {{
                            ...INITIAL_FORM_STATE
                        }}
                        validationSchema = {FORM_VALIDATION}
                         onSubmit = {takeDataToBase}
                        >
                            <Form>
                                <Grid container spacing = {2}>
                                
                                <Grid item xs = {12}>
                                <div style = {{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:'50px'}}>
                                <Avatar  style={{ height: '100px', width: '100px', cursor:"pointer" }} src={foto_path} alt = "" />
                                <Button style = {{marginLeft:'30px', height:"40px", backgroundColor:`${color}`, color:"white"}}
                                onClick = {()=>{
                                    ipcRenderer.send("open-file-dialog-for-update-file", foto_path);
                                    ipcRenderer.on("status-of-chosen-update-file", (event, data) => {
                                            if(data !== 'Nuk Zgjodhe Foto')
                                            {
                                                //meaning that he chose another foto
                                                setFoto(data);
                                                setColor("green");
                                            }

                                    })
                                }}
                                >{foto}</Button>
                                </div>
                                </Grid>
                                <Grid item xs = {6}>
                                    <TextFieldWrapper 
                                      name = 'emri'
                                      label = "Emri"
                                    />                                    
                                </Grid>
                                <Grid item xs = {6}>
                                <TextFieldWrapper 
                                      name = 'mbiemri'
                                      label = "Mbiemri"
                                    />
                                </Grid>                                  
                                    <Grid item xs = {12}>
                                        <DateTimePicker 
                                        name = 'data_prej'
                                        label = "Valid Nga Data"
                                        />
                                    </Grid>
                                    <Grid item xs = {12}>
                                        <DateTimePicker 
                                        name = 'data_deri'
                                        label = "Valid Deri Ne"
                                        />
                                    </Grid>

                                    <Grid item xs = {3}>
                                    <TextFieldWrapper 
                                      name = 'cmimi'
                                      label = "Cmimi"
                                    />
                                    </Grid>
                                    <Grid item xs = {12}>
                                    <TextFieldWrapper 
                                      name = 'datelindja'
                                      label = "Datelindja"
                                    />
                                    </Grid>

                                    <Grid item xs = {12}>
                                        <ButtonWrapper setOpenRegister = {setOpenRegister} >
                                            Regjistro
                                        </ButtonWrapper>
                
                                    </Grid>
                                </Grid>

                            </Form>
                            
                            </Formik>
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default MyFormUpdate

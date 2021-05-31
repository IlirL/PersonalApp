import React, { useEffect, useState } from 'react'

import { Grid, Input, makeStyles, Typography, Container, Paper, Button } from '@material-ui/core';


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

function MyForm({setOpenRegister}) {
    
    
    const [foto, setFoto] =  React.useState('Zgjedh Foto');
    const [color, setColor] = React.useState('blue');
    const takeDataToBase = ((values) => {   


        var newClient = {
            emri:values.emri,
            mbiemri:values.mbiemri,
            data_prej:values.data_prej,
            data_deri:values.data_deri,
            cmimi:values.cmimi,
            datelindja:values.datelindja,
        }
        ipcRenderer.send('sent_new_user', newClient)
      
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
                                        <Button onClick = {
                                            ()=>{
                                                ipcRenderer.send("open-file-dialog-for-file");
                                                //'status-of-chosen-file', 'Nuk Zgjodhe Foto'
                                                ipcRenderer.on('status-of-chosen-file', function(event, status){
                                                    setFoto(status);
                                                    if(status =='Nuk Zgjodhe Foto')
                                                    {
                                                        setColor('red');
                                                    }
                                                    else
                                                    {
                                                        setColor('darkgreen');
                                                    }
                                                })
                                                ipcRenderer.on('sending_path', (event, data) =>{
                                                    console.log("path data = ", data);
                                            }) 
                                            }
                                        }
                                        variant ='contained'
                                        style = {{backgroundColor:color, color:'white'}}
                                        
                                        >{foto}</Button>
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
                                 {/* <MuiPickersUtilsProvider utils = {DateFnsUtils}> */}
                                    {/* <Grid item xs = {12}>
                                        <DateTimePicker 
                                        name = 'datilindja'
                                        label = "Datlindja"
                                        />
                                    </Grid> */}
                               
                                
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
                                  {/* </MuiPickersUtilsProvider > */}

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
                                        <ButtonWrapper setOpenRegister = {setOpenRegister}>
                                            Regjistro
                                        </ButtonWrapper>
                                        {/* <Button  onClick = {submitForm()}>
                                            Regjistro
                                        </Button> */}
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

export default MyForm

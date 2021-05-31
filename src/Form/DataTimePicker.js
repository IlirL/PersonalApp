import React from 'react'
import {TextField} from '@material-ui/core'
import { useField } from 'formik';



function DataTimePicker({name, ...otherProps}) {
const [dateValue, setDateValue] = React.useState('')

    const [field, meta] = useField(name);
    const configDateTimePicker = {
        ...field,
        ...otherProps,
        type:'date',
        // format:'dd/mm/yyyy',
        variant: 'outlined',
        fullwidth:true,
        InputLabelProps:{
            shrink:true
        }
    }

    if(meta && meta.touched && meta.error){
        configDateTimePicker.error = true;
        configDateTimePicker.helperText = meta.error;
    }

    return (
        // <MuiPickersUtilsProvider utils = {DateFnsUtils}>
            
    //         <DatePicker

    // {...configDateTimePicker}
    
    <TextField 
    {...configDateTimePicker}       
    />
    // </MuiPickersUtilsProvider>
    )
}

export default DataTimePicker

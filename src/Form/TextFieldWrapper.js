import { TextField } from '@material-ui/core'
import React from 'react'
import {useField} from 'formik'

function TextFieldWrapper({name, ...otherProps}) {


    const [field, mata] = useField(name);
    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth:true,
        vaiant: 'outlined'
    }

    if(mata && mata.touched && mata.error){
        configTextField .error = true;
        configTextField.helperText = mata.error;
    }

    return (
        <TextField {...configTextField}/>
    )
}

export default TextFieldWrapper

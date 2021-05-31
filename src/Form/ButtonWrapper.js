import React from 'react'
import {Button} from '@material-ui/core'
import {useFormikContext} from 'formik'

function ButtonWrapper({children,setOpenRegister, set_initial_form_state,...otherProps}) {
   
    const {submitForm} = useFormikContext();
   
    const handleSubmit = () => {
        submitForm()
        setOpenRegister(false);
    }

    const configButton = {
        variant:'contained',
        color:'primary',
        fullWidth:true,
        // onClick:handleSubmit
    }

    return (
        <Button
        {...configButton}
        onClick = {handleSubmit}
        >
            {children}
        </Button>
    )
}

export default ButtonWrapper

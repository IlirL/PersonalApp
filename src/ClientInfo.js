import { Avatar, Box, Button, Container, Grid, Paper } from '@material-ui/core'
import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './ClientInfo.css'
const { ipcRenderer } = window.require('electron');

function ClientInfo({personChosen}) {
    console.log("personChosenin Client info", personChosen)
    const [showPayments, setShowPayments] = React.useState(true);
        const payments = React.useRef([])
        const totalDen = React.useRef(0);
        const totalMonth = React.useRef(0);
        // console.log('totalden adn totalmonths = ', totalMonth.current)

        React.useEffect( () =>{
        ipcRenderer.send('send_info_for_client', personChosen.id);
        ipcRenderer.once('sending_info_for_client', (event, data) =>{
            console.log('client_info_data = ', data);
           console.log('data.payments = ', data.payments);
            payments.current = [...data.payments];
            console.log('payments.current = ',payments.current)
            totalDen.current = data.total_den;
            totalMonth.current = data.total_months;
            setShowPayments(false);  
            // console.log('totalden adn totalmonths = ', totalMonth.current)
        })
    }, [])
    
    return (
                <div style = {{overflow:"hidden"}}>
                    <Grid container>
                    <Grid item>
                        <Container maxWidth = "md" maxHeight = '500px'>
                            <Grid container spacing = {4}>
                                <Grid item   xs = {12} justify = 'center'>
                                    <div style = {{}}>
                                    <Avatar src = {personChosen.foto_path} alt = "Ska Foto" style = {{width:"100px", height:'100px'}}/>
                                     <h3 style = {{marginTop:'5px', width:"max-content",borderBottom:'2px solid grey'}}>{`${personChosen.emri} ${personChosen.mbiemri}`}</h3>    
                                     </div>
                                </Grid>
                                <Grid item xs = {12}>
                                    <Button 
                                    variant = 'contained' 
                                    onClick = {() => {setShowPayments(!showPayments)}}
                                    style = {{
                                        background: 'linear-gradient(60deg, rgba(33,216,242,1) 0%, rgba(48,140,140,1) 23%, rgba(39,189,187,1) 41%, rgba(39,135,135,1) 58%, rgba(72,209,209,1) 77%, rgba(12,209,236,1) 100%)'
                                    }}
                                    >Te Gjitha Pagesat</Button>
                                    
                                    <div className = 'show_all_payments'>
                                    
                                    { 
                                      showPayments && 
                                      payments.current.map(singlePayment =>{
                                        console.log('singlePayment = ', singlePayment)    
                                        return <div style = {{color:'#736ac8'}}>{singlePayment}</div>
                                        })
                                    }
                                    </div>
                                </Grid>
                                <Grid item xs = {6}>
                                    <h5 style = {{borderBottom:'2px solid grey', color:"#2c2387",width:'max-content'}}>Total Den: <strong>{totalDen.current}</strong></h5>
                                </Grid>
                                <Grid item xs = {6}>
                                    <h5 style = {{borderBottom:'2px solid grey', color:"#2c2387",width:'max-content'}}>Total Muaj: <strong>{totalMonth.current}</strong></h5>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
                </div>
        
    )
}

export default ClientInfo

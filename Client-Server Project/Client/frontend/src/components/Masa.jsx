import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Masa(props) {
   const{status,updateCommand,send,count}=props;
   const handleReserve =()=>{
    updateCommand('RESERVE '+count);
    send();
   }
   const handleLeave =()=>{
    updateCommand('LEAVE '+count);
    send();
   }
   const  getCardBackgroundColor=(durum)=>{
       if(durum==0){
        return 'green'
       }else{
        return 'red'
       }
   }
   const checkDisabled = (status)=>{
    if(status==0){
      return false
    }else{
      return true
    }
   }
   const checkDisabled1 = (status)=>{
    if(status==0){
      return true
    }else{
      return false
    }
   }

    return (
    <Card sx={{ maxWidth: 345, backgroundColor: getCardBackgroundColor(status), marginLeft:'6px',}}>
     <CardContent>
        <Typography>
            Masa {count}
            <br />
            {status}
        </Typography>
     </CardContent>
     <CardActions>
        <Button onClick={handleReserve} variant='contained' disabled={checkDisabled(status)}>REZERVE ET</Button>
        <Button onClick={handleLeave} variant='contained' disabled={checkDisabled1(status)}>İPTAL</Button>
     </CardActions>
   </Card> 

  )
}

export default Masa
import React from 'react'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../css/cardstyle.css'

function Cards(props) {
    const {day}=props
  return (
    <Card sx={{ maxWidth: 345, marginLeft:'15px',marginRight:'15px'}}>
      <CardActionArea>
       <CardMedia/>
       <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='card-typography'>
             <h3>{day.date}</h3>
             <img src={day.day.condition.icon}  />
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}className='card-typography'>
           <div><b>{day.day.avgtemp_c} °C</b></div>
           <div>{day.day.condition.text}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Cards
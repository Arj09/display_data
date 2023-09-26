import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./Project/Context";
import axios from "axios";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const Detail =()=>{

    const { user, img} = useContext(UserContext)
    const [data, setData] = useState({})
    const navigate = useNavigate()
    

    useEffect(()=>{
        axios.get(`https://dummyjson.com/products/${user}`).then((res)=>{
            console.log(res.data)
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const handleBack = ()=>{
      navigate("/")
    }



    


    return(
        <>
        <Box  sx={{width:{xs:'100vw', md:'80vw'}, height:"100vw", margin:"20px", }}>
          <Button onClick={handleBack}>Back</Button>
          <Card  sx={{ width:'500px', height:"800px", margin:"20px auto"}}>
                <CardMedia
                  sx={{ height: '50%' , width:"100%", justifyContent:"center", margin:"10px", objectFit:"contain"}}
                  component="img"
                  
                  image = {img}
                  title="green iguana" 
            
            />
            <Divider/>
            <CardContent>
              <Typography gutterBottom   variant="h5" component="div">{data.title}</Typography>
              <Typography variant='body2'>{`${data.price} Rs /-`}</Typography>
              <Typography variant='body2'>{`${data.discountPercentage} % off`}</Typography>
              <Typography variant='body2'>{`Brand : ${data.brand}`}</Typography>
              <Typography variant='body2'>{`Description : ${data.description}`}</Typography>
            </CardContent>
            

           
          </Card>

        </Box>
        </>
    )
}
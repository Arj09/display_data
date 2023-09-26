import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, Button,IconButton, Paper, Stack, Typography, styled, Autocomplete, TextField} from '@mui/material'

import { UserContext } from './Project/Context';
import { useNavigate } from 'react-router-dom';




const Item = styled(Paper)(({theme})=>({
  backgroundColor:"pink",
  textAlign:"center",
  padding:"10px 20px"
}))


function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
    </React.Fragment>
  );
}
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



function Main() {
  const [data, setData] = useState([])
  const [expand, setExpand] = useState(false)
 
  const [option, setOption] = useState("All")
  const {setUser, setImg} = useContext(UserContext)

  const navigate = useNavigate()
 




  useEffect(()=>{
    axios.get('https://dummyjson.com/products').then((res)=>{
      console.log(res.data.products)
      setData(res.data.products)
      
    }).catch((err)=>{
      console.log(err)
    })
    

  }, [])


  const category = () => {
    return [...new Set(data.map((user) => user.category))];
  };

  
  

  const handleExpand = (id)=>{
   
    expand ? setExpand(false) : setExpand(true)
  }

  const handleExpandClose = ()=>{
    setExpand(false)

  }

  const handleCate = (e) =>{
    setOption(e.target.value)
  }

  const handleMore  = (id, img) =>{
    setUser(id)
    setImg(img)
    navigate("/detail")
  }
  
 
  return (
    <>
    <Box sx={{ flexGrow: 1 , width:{xs:'100vw', sm:"100vw", md:"80vw"}, margin:"20px auto", mt:"50px"}}>
      <Stack direction={'row'} spacing={3} sx={{width:"80%", margin:"20px 50px"}}>
          <select value={option} onChange={handleCate} style={{}}>
            <option value="All">All</option>
            {category().map((gender1) => {
              return (
                <option value={gender1} key={gender1}>
                  {gender1}
                </option>
              );
            })}
          </select>
        
        
        
      </Stack>

      <Typography variant='h3' sx={{textAlign:"center", justifyContent:"center", pt:"150px", display:{ xs: data.length == 0 ? 'block':"none", md: data.length == 0 ? 'block':"none"}}}>Please wait, data loading</Typography>
      <Grid container spacing={{ xs: 3, sm:4,  md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {
          data
          .filter((data)=> option == 'All' ? data : data.category == option)
          .map((data, index)=>{
            return(
              <Grid item xs={4} sm={4} md={4}  key={index}>
                <Card  sx={{ width:'300px', height:"400px", margin:"20px auto"}}>
                <CardMedia
                  sx={{ height: '50%' , width:"100%", justifyContent:"center", margin:"10px", objectFit:"contain"}}
                  component="img"
                  
                  image= {data.images[0]}
                  title="green iguana" 
            
            />
            <Divider/>
            <CardContent>
              <Typography gutterBottom   variant="h5" component="div">{data.title}</Typography>
              <Typography variant='body2'color="text.secondary">{`Price : ${data.price}`}</Typography>
              <Typography variant='body2'color="text.secondary">{`Discount : ${data.discountPercentage}`}</Typography>
            </CardContent>
            <CardActions sx={{mb:"10px"}}>
              <Button size="small" color="primary" onClick={()=>handleMore(data.id, data.images[0])}>
                More Detail
              </Button>
            </CardActions>

           
          </Card>
          
        </Grid>
            )
          })
        }

        

       
        
        

        

        
        

      </Grid>
    </Box>

    


    </>

  );
}

export default Main;

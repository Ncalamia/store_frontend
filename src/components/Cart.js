import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Login from './Login.js'
import Main from './Main.js'

import Add from './Add.js'
import Edit from './Edit.js'

import AddUser from './AddUser.js'
import OldUser from './OldUser.js'

import {FaHome} from 'react-icons/fa';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Modal from '@mui/material/Modal'
import { FormControl, FormLabel, OutlinedInput } from '@mui/material'

const Cart = (props) => {

    const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
    const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
    const localUrl = 'http://localhost:8000/api/products'
    const localUsersUrl = 'http://localhost:8000/api/useraccount'

	//////States//////


  const [product, setProduct] = useState([])
  let [cart, setCart] = useState([])  
  ////////SUM OF ITEMS

  const getTotalSum = () => {
    return props.cart?.reduce(
      (sum, { price }) => sum + price,   //// https://stackoverflow.com/questions/62358365/react-js-get-sum-of-numbers-in-array
                                         //// https://github.com/codyseibert/youtube/blob/master/react-shopping-cart/src/Cart.jsx
      0
    );
  }
 
  function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://homegoods-store.herokuapp.com/">
                It's basically homegoods.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [];

const theme = createTheme({
    palette: {
        primary: {

            main: '#ff4400',

        }
    }
})
///////OPEN - CLOSE CHECKOUT
const [open, setOpen] = useState(false);
const handleOpen = () => {

  setOpen(true);
}
const handleClose = () => {
    setOpen(false)
    
}

const handleCheckout = ()=>{
    props.cart.length = 0
    props.setView('main')
    
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

if (props.view === 'main') {
    return (
        <>
            <Main />
        </>
    )}

  return (
    <>
 <ThemeProvider theme={theme}>


<CssBaseline />
                    <AppBar position="relative">
                        <Toolbar>

                            <Typography variant="h6" color="inherit" noWrap>
                                < Link color="inherit" href={localUrl} sx={{ fontSize: 40 }} >
                                    < FaHome />
                                </Link>
                                
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >

                            <Container >
                                <Typography
                                    component="h1"
                                    variant="h2"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                   Welcome to Your Cart.
                                </Typography>
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button  onClick={()=>props.setView('main')} variant="contained">Back to browsing</Button>
                                   
                                    </Stack>
                                    <Box sx={{ bgcolor: 'background.paper', p: 6 }}>
                                    <ol>
                                    <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={5}
                                    justifyContent="center"
                                    flexWrap={'wrap'}
                                > 
                                
                            {props.cart.map((item, index) => {
                              return (
                                <Grid key={item.id} sx={{ bgcolor: 'background.paper', p: 2}}>
                                   {/* <button onClick={(e)=>props.setCart([...props.cart, e.target.id])}>Remove</button> */}
                                  <img style={{width: 50, height: 'auto'}} src={item.image}/>
                                   <li>{item.name}</li>
                                  
                                  {console.log(props.cart)}
                                  </Grid>
                           
                            )
                            })}
                            <Container>
                                   <h3>Total Cost: ${getTotalSum()} </h3>
                                   <Button  variant="contained" onClick={handleOpen}>CHECKOUT({props.cart.length})</Button>
                                   </Container>
                                  
                            <Modal
                                open={open}

                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{...style, width:'50vw', height: 'auto'}}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Shopping Cart
                                    </Typography>
                                   
                                    <form>
                                              <FormControl >
                                              <FormLabel>First Name</FormLabel>
                                              <OutlinedInput sx={{height: 30}} type='text'/>
                                              <FormLabel>Last Name</FormLabel>
                                              <OutlinedInput sx={{height: 30, width: 300}}  type='text'/>
                                              <FormLabel>Credit card namber</FormLabel>
                                              <OutlinedInput sx={{height: 30}}  type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
                                              <FormLabel for="expmonth">Exp Month</FormLabel>
                                              <OutlinedInput sx={{height: 30}}  type="text" id="expmonth" name="expmonth" placeholder="September"/>
                                              <FormLabel for="expyear">Exp Year</FormLabel>
                                              <OutlinedInput sx={{height: 30, width: 100}}  type="text" id="expyear" name="expyear" placeholder="2022"/>

                                              <FormLabel for="cvv">CVV</FormLabel>
                                              <OutlinedInput sx={{height: 30, width: 70}} type="text" id="cvv" name="cvv" placeholder="352"/>
                                              </FormControl>
                                              </form>

                            <h3>Total: ${getTotalSum()} </h3>
                            <Button onClick={handleCheckout}>Checkout</Button>
                            <Button onClick={handleClose}>Back to cart</Button>
                               
                                </Box>
                            </Modal>
                        
                      
                            </Stack>
                            </ol>
                            </Box>
                            </Container>
                        </Box>


                        <Box sx={{ bgcolor: 'background.paper', p: 6 }}>
                        <Typography variant="h6" align="center" gutterBottom>

                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            component="p"
                        >
                            Created by Nikki, Jacqueline and Yulia.
                        </Typography>
                        <Copyright />
                    </Box>

                </ThemeProvider>



    </>
  )
}

export default Cart

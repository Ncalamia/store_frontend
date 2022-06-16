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


const Cart = (props) => {

    const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
    const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
    const localUrl = 'http://localhost:8000/api/products'
    const localUsersUrl = 'http://localhost:8000/api/useraccount'

	//////States//////

  const [cart, setCart] = useState([])
  const [product, setProduct] = useState([])  
  let [view, setView] = useState('')
  const getTotalSum = () => {
    return cart.reduce(
      (sum, { price }) => sum + price,   //// https://stackoverflow.com/questions/62358365/react-js-get-sum-of-numbers-in-array
                                         //// https://github.com/codyseibert/youtube/blob/master/react-shopping-cart/src/Cart.jsx  
      0
    );
  }

  function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
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

if (view === 'main') {
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

                            <Container maxWidth="sm">
                                <Typography
                                    component="h1"
                                    variant="h2"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                   Welcome to your Cart.
                                </Typography>
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button  onClick={()=>setView('main')} variant="contained">Back to browsing</Button>
                                    <Container>
                           Test Shopping cart.
                            <ol>
                        {cart.map((items)=>{
                                return(
                                    <>
                                    <div key={items.id}>
                                        <li>{items.name}</li>
                                    </div>

                                    
                                    </>

                                )
                            })}
                            </ol>
                        <div>Total Cost: ${getTotalSum()} </div>
                        </Container>
                                </Stack>
                            </Container>
                           
                        </Box>
                        <Grid container spacing={4}>
                                {cart.map((items) => (
                                    <Grid item key={items.id} xs={12} sm={6} md={4}>
                                        <Card
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    // 16:9
                                                    pt: '56.25%',
                                                }}
                                                image={items.image}
                                                alt="random"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {items.name}
                                                    <Button onClick={(e)=>setCart([...cart, product])}>Add to Cart</Button>
                                                </Typography>
                                                <Typography>
                                                    Price: {items.price}$
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                               
                                                
                                            </CardActions>
                                        </Card>

                                    </Grid>
                                ))}
                                </Grid>

                        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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

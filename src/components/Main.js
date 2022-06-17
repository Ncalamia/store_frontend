//////////////////////////////////////////////
//import
//////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Login from './Login.js'
import Welcome from './Welcome.js'
import Cart from './Cart.js'
import Signup from './Signup.js'


import Add from './Add.js'
import Edit from './Edit.js'

import AddUser from './AddUser.js'
import OldUser from './OldUser.js'

import { FaHome } from 'react-icons/fa';
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

const Main = (props) => {

    //////////////////////////////////////////////
    //states
    //////////////////////////////////////////////

    // general states
    let [products, setProducts] = useState([])
 
    let [users, setUsers] = useState([])
    let [regulars, setRegulars] = useState([])
<<<<<<< HEAD
    let [accounts, setAccounts] = useState('old')
    const [cart, setCart] = useState([])
=======

>>>>>>> 40cf114cfe7734ec83d0dcbb5f3c87fc8ba3a392


    // local vs heroku links - deploy with heroku
    const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
    const localUrl = 'http://localhost:8000/api/products'

    const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
    const localUsersUrl = 'http://localhost:8000/api/useraccount'

    const herokuLoginUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount/login'
    const localLoginUrl = 'http://localhost:8000/api/useraccount/login'

    ////////////////////////////////////////////////////////////
    // CRUD Functionality - PRODUCTS (api/products)
    ////////////////////////////////////////////////////////////

    //////Fetching products/////////
    const getProducts = () => {
        axios
            // .get(localUrl)
            .get(herokuUrl)
            .then(
                (response) => setProducts(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error))
    }

    ///////CREATE PRODUCT//////////
    const handleCreate = (addProduct) => {
        axios
            // .post(localUrl, addProduct)
            .post(herokuUrl, addProduct)
            .then((response) => {
                console.log(response)
                // getProducts()
                setProducts([...products, addProduct])
            })
    }

    ///////UPDATE PRODUCT//////////
    const handleUpdate = (updateProduct) => {
        console.log(updateProduct.id)
        axios
            // .put(localUrl + '/' + updateProduct.id, updateProduct)
            .put(herokuUrl + '/' + updateProduct.id, updateProduct)
            .then((response) => {
                getProducts()
                setProducts(products.map((product) => {
                    return product.id != response.data.id ? product : response.data
                }))

            })
    }


    ///////DELETE PRODUCT//////////
    const handleDelete = (event, deleted) => {
        axios
            // .delete(localUrl + '/' + event.target.value)
            .delete(herokuUrl + '/' + event.target.value)
            .then((response) => {
                getProducts()
            })
    }



    ////////////////////////////////////////////////////////////
    // CRUD Functionality - USERS (api/useraccount)
    //      // new user login
    ////////////////////////////////////////////////////////////


    //////Fetching users/////////
    const getUsers = () => {
        axios
            // .get(localUsersUrl)
            .get(herokuUsersUrl)
            .then(
                (response) => setUsers(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error))
    }


    ///////CREATE USER - new user login //////////
    const userSignup = (addUser) => {
        axios
            // .post(localUsersUrl, addUser)
            .post(herokuUsersUrl, addUser)
            .then((response) => {
                console.log(response)
                // getUsers()
                setUsers([...users, addUser])
                props.setView('login')
            })
    }



    //////////////////////////////////////////////
    // useEffect
    //////////////////////////////////////////////

    useEffect(() => {
        if (props.view === 'signup') {
            getUsers()
        } else if (props.view === 'main') {
            getProducts()
        } else if (props.view === 'welcome') {
            getProducts()
        }
        else {
            getUsers()
        }
    }, [])


    //////////////////////////////////////////////
    // functions - related to login
    //////////////////////////////////////////////

    ////Welcome to Login view - returning user/////
    const userLogin = () => {
        props.setView('login')
    }

    ////Login to Signup view - new user/////
    const newSignup = () => {
        props.setView('signup')
    }

    ////Signup to Login view - returning user/////
    const oldLogin = () => {
        props.setView('login')
    }

    //////////////////////////////////////////////
    // functions - related to scroll
    //////////////////////////////////////////////

    const productsRef = useRef()
    const scrollDown = () => {
        window.scrollTo({
            top: productsRef.current.offsetTop,
            behavior: 'smooth',
        });
    };

    //////////////////////////////////////////////
    // functions - related to add to cart
    //////////////////////////////////////////////

    const getTotalSum = () => {
        return cart.reduce(
          (sum, { price }) => sum + price,   //// https://stackoverflow.com/questions/62358365/react-js-get-sum-of-numbers-in-array
                                             //// https://github.com/codyseibert/youtube/blob/master/react-shopping-cart/src/Cart.jsx  
          0
        );
      }

      const [open, setOpen] = useState(false);
      const handleOpen = () => {
      
        setOpen(true);
      }
      const handleClose = () => setOpen(false);
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


      const [checkout, setCheckout] = useState(false)

      const openCheck = () =>{
          setOpen(false)
          setCheckout(true)
      }
      const closeCheck = () =>{
        setOpen(true)
        setCheckout(false)
    }
    //////////////////////////////////////////////
    // functions - related to styling
    //////////////////////////////////////////////

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



    //////////////////////////////////////////////
    // the return - skeleton
    //////////////////////////////////////////////


    if (props.view === 'welcome') {
        return (
            <>
                <Welcome />
            </>
        )
    } else if (props.view === 'cart'){
        return (
            <>
            < Cart view={props.view} setView={props.setView} cart={cart}/>
            </>
        )
    
    } else if (props.view === 'login') {
        return (
            <>

                <Login />

            </>
        )
    } else if (props.view === 'signup') {
        return (
            <>

                <Signup />

            </>
        )
    } else if (props.view === 'main') {
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
                                {/* <Button color="inherit" onClick={()=>setView('cart')}>Go to cart({cart.length})</Button> */}
                             
                        <Button color="inherit" onClick={handleOpen}>Test Shopping cart.({cart.length})</Button>
                            <Modal
                                open={open - checkout}
                                 
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{...style, width:500, height: 600}}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Shopping Cart
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <ol>
                        {cart.map((items)=>{
                                return(
                                    <>
                                    <div key={items.id}>
                                        <li >{items.name}</li>
                                        {/* <img style={{width:'20%', display:'flex'}} src={items.image}/> */}
                                    </div>

                                    
                                    </>

                                )
                            })}
                            </ol>
                            <div>Total Cost: ${getTotalSum()} </div>
                            <Button onClick={openCheck}>Checkout</Button>
                            <Button onClick={handleClose}>Close</Button>
                            
                                            <Modal
                                                hideBackdrop
                                                open={checkout}
                                                onClose={closeCheck}
                                                aria-labelledby="child-modal-title"
                                                aria-describedby="child-modal-description"
                                            >
                                                <Box sx={{ ...style, width:300, height: 400 }}>
                                                    <h2 id="child-modal-title">Your total is : ${getTotalSum()}</h2>
                                                 <form>
                                                        <label>Name</label>
                                                        <input type='text'/>
                                                        <label>Last Name</label>
                                                        <input type='text'/>
                                                        <label>Credit card namber</label>
                                                        <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
                                                        <label for="expmonth">Exp Month</label>
                                                        <input type="text" id="expmonth" name="expmonth" placeholder="September"></input>
                                                        <label for="expyear">Exp Year</label>
                                                        <input type="text" id="expyear" name="expyear" placeholder="2018"/>
                                                
                                                        <label for="cvv">CVV</label>
                                                        <input type="text" id="cvv" name="cvv" placeholder="352"/>
                                                        <Button onClick={handleClose}>Checkout</Button>
                                                        </form>
                                                    
                                                    <Button onClick={closeCheck}>Back to Cart</Button>
                                                    
                                                </Box>
                                            </Modal>
                                    </Typography>
                                </Box>
                            </Modal>
                          
                        
                       
                       <Button color="inherit" onClick={()=>props.setView('cart')}>Cart</Button>
                            </Typography>
                            <Typography variant="h6" color="inherit" noWrap>
                                Welcome, {props.currentUser}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        {/* Hero unit */}
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
                                    Essentials.
                                </Typography>
                                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                    Welcome!
                                    Pretend you've never heard of Home Goods.
                                    Here you can find everything your home needs!
                                  
                                </Typography>
                               
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button onClick={scrollDown} variant="contained">Browse Products</Button>

                                </Stack>
                            </Container>
                        </Box>
                        <Container ref={productsRef} sx={{ py: 8 }} maxWidth="md">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {products.map((product) => (
                                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                                        <Card 
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    // 16:9
                                                    pt: '56.25%',
                                                }}
                                                image={product.image}
                                                alt="random"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {product.name}
                                                    <Button onClick={(e)=>setCart([...cart, product])}>Add to Cart</Button>
                                                </Typography>
                                                <Typography>
                                                    Price: {product.price}$
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={handleDelete} value={product.id}>Delete</Button>
                                                <Edit handleUpdate={handleUpdate} id={product.id} />
                                                
                                            </CardActions>
                                        </Card>

                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                      
                        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                            <Button variant="outlined"><Add handleCreate={handleCreate} /></Button>
                        </Typography>

                    </main>
                    {/* Footer */}
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


}

export default Main

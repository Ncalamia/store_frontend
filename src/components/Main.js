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

import { FaHome, FaShoppingCart } from 'react-icons/fa';
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
import { FormControl, FormLabel } from '@mui/material'
import { OutlinedInput } from '@mui/material'
const Main = (props) => {

    //////////////////////////////////////////////
    //states
    //////////////////////////////////////////////

    // general states
    let [products, setProducts] = useState([])
    let [users, setUsers] = useState([])
    let [regulars, setRegulars] = useState([])
    let [cart, setCart] = useState([])
    const [query, setQuery] = useState("")

    // local vs heroku links - deploy with heroku
    const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
    const localUrl = 'http://localhost:8000/api/products'

    const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
    const localUsersUrl = 'http://localhost:8000/api/useraccount'

    const herokuLoginUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount/login'
    const localLoginUrl = 'http://localhost:8000/api/useraccount/login'

    const herokuCartUrl = 'https://arcane-sea-71685.herokuapp.com/api/usercart'
    const localCartUrl = 'http://localhost:8000/api/usercart'
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
    const handleDelete = (deletedProduct) => {
        axios
            // .delete(localUrl + '/' + event.target.value)
            .delete(herokuUrl + '/' + deletedProduct.id)
            .then((response) => {
                setProducts(products.filter(product => product.id !== deletedProduct.id))
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
        return props.cart.reduce(
            (sum, { price }) => sum + price,   //// https://stackoverflow.com/questions/62358365/react-js-get-sum-of-numbers-in-array
            //// https://github.com/codyseibert/youtube/blob/master/react-shopping-cart/src/Cart.jsx
            0
        );
    }
    const getCarts = () => {
        axios
            // .get(localCartUrl)
            .get(herokuCartUrl)
            .then(
                (response) => props.setCarts(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error))
    }
    // useEffect(() => {
    //
    //     getCarts()
    //
    // }, [])
    const handleCreateCart = (cartId, product) => {
        console.log(cartId)
        console.log(product)
        axios
            // .post(localCartUrl, addProduct)
            .put(herokuCartUrl + '/' + cartId, product)
            .then((response) => {


                props.setCarts(products.map((product)=>{
                    return product.id != response.data.id ? product : response.data
                }))
            })
    }
    //////////////////////////////////////////////
    // functions - related to search
    //////////////////////////////////////////////
    const handleChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value);
      };
    //////////////////////////////////////////////
    // functions - related to styling
    //////////////////////////////////////////////

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



    //////////////////////////////////////////////
    // the return - skeleton
    //////////////////////////////////////////////


    if (props.view === 'welcome') {
        return (
            <>
                <Welcome />
            </>
        )
    } else if (props.view === 'cart') {
        return (
            <>
                < Cart view={props.view} setView={props.setView} cart={props.cart} currentUser={props.currentUser} carts={props.carts} setCarts={props.setCarts} currentUserID={props.currentUserID} setCurrentUserID={props.setCurrentUserID} />
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

                                < Link color="inherit" href='#'
                                sx={{ fontSize: 40 }} >
                                    < FaHome />
                                </Link>
                                {/* <h2>Welcome,  </h2> */}
                            </Typography>
                            <Typography sx={{ fontSize: 20, ml: 2, float: 'right' }} >
                                <div className='cart'>
                                    <FaShoppingCart color="inherit" onClick={() => props.setView('cart')} />

                                    {props.carts.map((cart) => {

                                        return (

                                            <div className='cart' key={cart.id}>

                                                {props.currentUserID == cart.customer ?  ////show user if id's are the same

                                                    <h4>({cart.products.length})</h4>



                                                    : ""}

                                            </div>
                                        )
                                    })}
                                </div>


                                {console.log(props.carts)}

                            </Typography>
                            <Typography variant="h6" align="center" color="inherit" sx={{ marginLeft: 5 }}>
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
                        <OutlinedInput sx={{width: '100vw', mt: 10}} type="search" id="search"  placeholder="Look up Products" onChange={handleChange} />
                        <Container ref={productsRef} sx={{ py: 8 }} maxWidth="md">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                            {
                                    products.filter(findOne => {
                                        if (query == "") {
                                            return findOne
                                        } else if (findOne.name.toLowerCase().includes(query.toLowerCase())) {
                                            return findOne
                                        }

                                    }).map((product) => (
                                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                                        <Card
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardMedia
                                                component="img"

                                                image={product.image}
                                                alt="random"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {product.name}

                                                </Typography>
                                                <Typography>
                                                    Price: {product.price}$
                                                </Typography>
                                            </CardContent>
                                            <CardActions>

                                                <Button onClick={()=> handleDelete(product)} value={product.id}>Delete</Button>
                                                <Edit handleUpdate={handleUpdate} product={product}/>
                                                {/* <Button onClick={(e)=>props.setCart([...props.cart, product])}>Add to Cart</Button> */}
                                                {/* {props.carts.map((cart) => {
                                                    return (

                                                        <div className='cart' key={cart.id}>

                                                            {props.currentUserID == cart.customer ?
                                                                <Button onClick={handleCreateCart(cart.id, product)}>Add to Cart</Button> : ""}
                                                                </div>
                                                                )})} */}

                                            </CardActions>
                                        </Card>

                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                        <Container>
                            <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                                <Button variant="outlined"><Add handleCreate={handleCreate} /></Button>
                            </Typography>
                        </Container>

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

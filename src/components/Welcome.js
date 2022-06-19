//////////////////////////////////////////////
//import
//////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Login from './Login.js'
import Signup from './Signup.js'
import Main from './Main.js'

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
import { OutlinedInput } from '@mui/material'


const Welcome = (props) => {
    // general states
    let [products, setProducts] = useState([])
    let [users, setUsers] = useState([])
    let [regulars, setRegulars] = useState([])
    const [query, setQuery] = useState("")

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


    ////////////////////////////////////////////////////////////
    // CRUD Functionality - USERS (api/useraccount/login)
    //      // returning user login
    ////////////////////////////////////////////////////////////

    // returning user login
    const handleUpdateUser = (userAccount) => {
        axios
            // .put(localLoginUrl, userAccount)
            .put(herokuLoginUrl, userAccount)
            .catch((error) => {
                if (error) {
                    // console.log('wrong')
                    alert("Email or password does not match records")
                }
            })
            .then((response) => {
                // console.log(userAccount)
                // console.log(response.data)
                // setRegulars(response.data)
                props.setView('main')
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
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar position="relative">
                        <Toolbar>

                            <Typography variant="h6" color="inherit" noWrap>
                                < Link color="inherit" href="https://homegoods-store.herokuapp.com/" sx={{ fontSize: 40 }} >
                                    < FaHome />
                                </Link>
                            </Typography>

                            <Button varient="text" color="inherit" onClick={userLogin}>Login</Button>

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
                                {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                    Welcome!

                                   Pretend you've never heard of Home Goods.
                                    Here you can find everything your home needs!

                                </Typography> */}
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button onClick={scrollDown} variant="contained">Browse Products</Button>

                                </Stack>
                            </Container>
                            <OutlinedInput sx={{width: '100vw', mt: 10}} type="search" id="search"  placeholder="Look up Products" onChange={handleChange} />
                        </Box>
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
                                    <Grid item key={product} xs={12} sm={6} md={4}>
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

                                        </Card>

                                    </Grid>
                                ))}  
                            </Grid>
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
                <Main />
            </>
        )
    }

}

export default Welcome

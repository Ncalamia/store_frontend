//////////////////////////////////////////////
//import
//////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Welcome from './Welcome.js'
import Login from './Login.js'
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


const Signup = (props) => {
    //////////////////////////////////////////////
    //states
    //////////////////////////////////////////////

    // general states
    let [products, setProducts] = useState([])
    let [users, setUsers] = useState([])
    let [regulars, setRegulars] = useState([])
    // let [accounts, setAccounts] = useState('old')

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
    // functions - related to styling
    //////////////////////////////////////////////

    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright ?? '}
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
    } else if (props.view === 'login') {
        return (
            <>

                <Login />

            </>
        )
    } else if (props.view === 'signup') {
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
                                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                    Welcome!
                                </Typography>
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                </Stack>
                            </Container>
                        </Box>
                        <Container sx={{ py: 8 }} maxWidth="md">
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" color="text.secondary" paragraph>
                                        Sign Up
                                    </Typography>
                                    <AddUser view={props.view} setView={props.setView} userSignup={userSignup} />

                                    <br />
                                    <Typography gutterBottom component="h2"
                                        variant="subtitle1"
                                        color="text.secondary">
                                        Have an account already? <Button variant="text" onClick={oldLogin}>Log in</Button>
                                    </Typography>
                                </CardContent>


                            </Card>
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
    } else if (props.view === 'main') {
        return (
            <>
                <Main />
            </>
        )
    }

}

export default Signup

//////////////////////////////////////////////
//import
//////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Login from './Login.js'
import Welcome from './Welcome.js'

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


const Main = (props) => {

    //////////////////////////////////////////////
    //states
    //////////////////////////////////////////////

    // general states
    let [products, setProducts] = useState([])
    let [view, setView] = useState('welcome')
    let [users, setUsers] = useState([])
    let [accounts, setAccounts] = useState('old')

    // local vs heroku links - deploy with heroku
    const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
    const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
    const localUrl = 'http://localhost:8000/api/products'
    const localUsersUrl = 'http://localhost:8000/api/useraccount'

    //////////////////////////////////////////////
    // fetching the data from the backend 
    //////////////////////////////////////////////

    //////Fetching products/////////
    const getProducts = () => {
        axios
            .get(localUrl)
            .then(
                (response) => setProducts(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error))
    }

    //////Fetching users/////////
    const getUsers = () => {
        axios
            .get(localUsersUrl)
            .then(
                (response) => setUsers(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error))
    }

    ////////////////////////////////////////////////////////////
    // CRUD Functionality
    ////////////////////////////////////////////////////////////

    ///////CREATE PRODUCT//////////
    const handleCreate = (add) => {
        axios.post(localUrl, add).then((response) => {
            console.log(response)
            console.log(response.data.id)
            setUsers([...users, response.data])
        })
    }

    ///////CREATE USER//////////
    const userSignup = (addUser) => {
        setAccounts('new')
        axios
            .post(localUsersUrl, addUser)
            .then((response) => {
                // console.log(response)
                // console.log(response.data.id)
                setUsers([...users, response.data])

            })
    }

    ///////UPDATE PRODUCT//////////
    const handleUpdate = (updateProduct) => {
        console.log(updateProduct.id)
        axios
            .put(localUrl + '/' + updateProduct.id, updateProduct)
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
            .delete(localUrl + '/' + event.target.value)
            .then((response) => {
                getProducts()
            })
    }

    //////////////////////////////////////////////
    // functions - related to login
    //////////////////////////////////////////////

    ////Login view - returning user OR new sign-in /////
    const userLogin = () => {
        setView('login')
    }

    const oldLogin = () => {
        setAccounts('old')
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
    // useEffect
    //////////////////////////////////////////////

    useEffect(() => {
        if (view === 'login') {
            getUsers()
        } else if (view === 'main') {
            getProducts()
        } else if (view === 'welcome') {
            getProducts()
        }
    }, [])


    //////////////////////////////////////////////
    // the return - skeleton
    //////////////////////////////////////////////


    if (view === 'welcome') {
        return (
            <>
                <Welcome />
            </>
        )
    } else if (view === 'login') {
        return (
            <>

                <Login />

            </>
        )
    } else if (view === 'main') {
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
                                    <div>
                                    <p>Pretend you've never heard of Home Goods.</p>
                                    <p>Here you can find everything your home needs!</p>
                                    </div>
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
                        </Box>
                        <Container ref={productsRef} sx={{ py: 8 }} maxWidth="md">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {products.map((product) => (
                                    <Grid item key={product} xs={12} sm={6} md={4}>
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
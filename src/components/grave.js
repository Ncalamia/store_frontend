// THIS PAGE IS FOR TEAM NOTES/ PLANNING


//////////////////////////////////////////////
// Team notes
//////////////////////////////////////////////

// the below code is a high level strucutre each view (component)
    // Welcome.js - the initial page the user sees
    // Login.js - login / sign up page (user auth)
    // Main.js - CRUD app - which only renders once user is logged in
//


//////////////////////////////////////////////
//import
//////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Login from './Login.js'

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


//////////////////////////////////////////////
//states
//////////////////////////////////////////////

// general states
let [products, setProducts] = useState([])
let [view, setView] = useState('welcome')
let [users, setUsers] = useState([])
let [accounts, setAccounts] = useState('old')

// local vs heroku links
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


// if (view === 'welcome') {
//     return (
//       <>
//         <Welcome/>
//       </>
//     )
//   } else if (view === 'login') {
//     return (
//       <>

//       <Login/>

//       </>
//     )
//   } else if (view === 'main') {
//     return (
//       <>
//         <Main/>
//       </>
//     )
//   }



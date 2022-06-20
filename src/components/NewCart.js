import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

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


const NewCart = (props) => {


    // local vs heroku links - deploy with heroku
    const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
    const localUrl = 'http://localhost:8000/api/products'

    const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
    const localUsersUrl = 'http://localhost:8000/api/useraccount'

    const herokuLoginUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount/login'
    const localLoginUrl = 'http://localhost:8000/api/useraccount/login'

    const herokuCartUrl = 'https://arcane-sea-71685.herokuapp.com/api/usercart'
    const localCartUrl = 'http://localhost:8000/api/usercart'

    //////States//////
    const [product, setProduct] = useState([])

    const i = 0


    ////////////////////////////////////////////////////////////
    // CRUD Functionality - user cart (api/usercart)
    ////////////////////////////////////////////////////////////

    //////Fetching user cart/////////
    const getUserCart = (currentUser) => {
        axios
            // .get(localCartUrl)
            .get(herokuCartUrl)
            .then(
                (response) => {
                    props.setCart(response.data.filter(cartItem => cartItem.customer.id === currentUser))
                })
    }

    //////Fetching user cart/////////
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

    // ///////CREATE PRODUCT//////////
    const handleAddItem = (addCartItem) => {
        axios
            // .post(localCartUrl, addCartItem)
            .post(herokuCartUrl, addCartItem)
            .then((response) => {
                console.log(response)
                getUserCart()
                // props.setCart([...items, addCartItem])
            })
    }

    // ///////DELETE PRODUCT//////////
    const handleDeleteItem = (event, deletedCartItem) => {
        axios
            // .delete(localCartUrl + '/' + event.target.value)
            .delete(herokuCartUrl + '/' + event.target.value)
            .then((response) => {
                getUserCart()
            })
    }



    //////////////////////////////////////////////
    // useEffect
    //////////////////////////////////////////////

    useEffect(() => {

        getCarts()

    }, [])

    //////////////////////////////////////////////
    // cart functions
    //////////////////////////////////////////////

    const getTotalSum = () => {
        return props.cart?.reduce(
            (sum, { price }) => sum + price,   //// https://stackoverflow.com/questions/62358365/react-js-get-sum-of-numbers-in-array
            //// https://github.com/codyseibert/youtube/blob/master/react-shopping-cart/src/Cart.jsx
            0
        );
    }

    // const getUserCart = () => {
    //     if (props.carts[0].customer !== props.currentUserID) {
    //         props.carts[0+1]
    //         setIndex(index+1)
    //     } else {
    //         console.log(props.carts[index])
    //         // props.setCarts[index]
    //     }
    //
    // }



    return (
        <>
            <Button  onClick={()=>props.setView('main')} variant="contained">Back to browsing</Button>

            <h1>{props.currentUser}'s Cart</h1>
            <h1> useraccount_ID: {props.currentUserID}</h1>

            {/* option 1 */}

            {/* <div>
                {props.carts.map((cart) => {
                    return (
                        <div className='cart' key={cart.id}>
                            <h4>Cart_ID: {cart.id}</h4>
                            <h4>Customer_ID: {cart.customer}</h4>
                                {props.carts.products.map((cartItem) => {
                                    return (
                                        <div className='cartItem' key={cart.products.id}>
                                            <h4>Product_ID: {cart.products.id}</h4>
                                            <h4>Product_Name: {cart.products.name}</h4>
                                        </div>

                                    )
                                })}
                        </div>
                    )
                })}
            </div>  */}

            {/* option 2 */}
             <div>
                {props.carts.map((cart) => {
                    if (props.currentUserID !== props.carts[0].customer) {
                        return (
                            <div>
                                {props.carts[0+1]}
                                {props.props.setIndex(props.index+1)}
                            </div>
                        )
                    } else {
                        return (
                            <div className='cart' key={cart.id}>
                                {console.log(props.carts)}
                                {props.setCarts[props.index]}
                            </div>
                        )
                    }
                })}
            </div>

            {/* option 3 */}

            {/* <div>
                {props.carts.map((cart) => {
                    if (props.carts[props.index].customer === props.currentUserID) {
                        return (
                            <div className='cart' key={cart.id}>
                                <h4>Cart_ID: {cart.id}</h4>
                                <h4>Customer_ID: {cart.customer}</h4>
                                <h4>Products</h4>
                                    <div className='cart_items'>
                                        {props.carts.map((cart) => {

                                        })}
                                    </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                {props.setIndex[i+1]}
                                {props.setCarts(props.index)}
                            </div>
                        )
                    }

                })}
            </div>  */}

            {/* {console.log(props.carts[0].customer)} */}
            {console.log(props.carts[0].customer)}
            {/* {console.log(props.carts[props.index].customer)} */}

            {/* {props.currentUserID !== props.carts[0].customer ?
                props.carts[0+1]
                // props.setIndex(index+1)
            :
                console.log(props.carts)
                // props.setCarts[index]
            } */}


            {console.log(props.carts[0].products)}

        </>
    )
}

export default NewCart

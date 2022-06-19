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
import { FormControl, FormLabel, FormGroup,TextField, OutlinedInput } from '@mui/material'


const Edit = (props) => {

	//////States//////
  let emptyProduct = { id: props.id, image: '', name: '', category: '', price: '' }
  const [product, setProduct] = useState(emptyProduct)



	/////Functions///////
const handleChange = (event) => {
	// console.log(event);
  	setProduct({ ...product, [event.target.name]: event.target.value })
}



const handleSubmit = (event) => {
  event.preventDefault()
  props.handleUpdate(product)
}

const [open, setOpen] = useState(false);
const handleOpen = () => {

  setOpen(true);
}
const handleClose = () => setOpen(false);
const style = {  
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 100,
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 4
};
  return (
    <>
    {/* <details>

    <summary>EDIT</summary>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image: </label>
        <input type="url" name="image" value={product.image} onChange={handleChange}/>
				<br />
        <br />
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={product.name} onChange={handleChange}/>
        <br />
        <br />

				<label htmlFor="category">Category: </label>
        <input type="text" name="category" value={product.category} onChange={handleChange}/>
				<br />
        <br />
				<label htmlFor="price">Price: </label>
        <input type="number" name="price" value={product.price} onChange={handleChange}/>
        <input type="submit"/>
      </form>
      </details> */}
       <Button onClick={handleOpen}>EDIT</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, height: 'auto' }}>

      

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ml:'20%'}}>
        <FormLabel htmlFor="image">Image: </FormLabel>
        <OutlinedInput sx={{height: 30}} type="url" name="image" value={product.image} onChange={handleChange}/>
			
        <FormLabel htmlFor="name">Name: </FormLabel>
        <OutlinedInput sx={{height: 30}} type="text" name="name" value={product.name} onChange={handleChange}/>
            
				<FormLabel htmlFor="category">Category: </FormLabel>
        <OutlinedInput sx={{height: 30}}type="text" name="category" value={product.category} onChange={handleChange}/>
		
				<FormLabel htmlFor="price">Price: </FormLabel>
        <OutlinedInput sx={{height: 30}} type="number" name="price" value={product.price} onChange={handleChange}/>
        
        <Button type="submit">Submit</Button>
        </FormControl>
      </form>
      
          <Button onClick={handleClose}>Close</Button>
          

        </Box>
      </Modal>
    </>
  )
}

export default Edit

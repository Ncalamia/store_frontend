import React, { useState, useEffect } from 'react'
import { FormControl, FormLabel, FormGroup,TextField, OutlinedInput, Input} from '@mui/material'
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
const Add = (props) => {

	//////States//////
  let emptyProduct = { image: '', name: '', category: '', price: '' }
  const [product, setProduct] = useState(emptyProduct)



	/////Functions///////
const handleChange = (event) => {
	// console.log(event);
  	setProduct({ ...product, [event.target.name]: event.target.value })
}



const handleSubmit = (event) => {
  event.preventDefault()
  // console.log(product)
  props.handleCreate(product)

	setProduct({image:'', name: '', category: '', price: '' })
}

  return (
    <>
<details>
  <summary>ADD MORE STUFF</summary>
<form  onSubmit={handleSubmit} className='createForm'>
  
<FormGroup align='left' sx={{height: 'auto', width: '80vw'}}>
        <FormLabel htmlFor="image">Image: </FormLabel>
        <Input sx={{height: 30}} type="url" name="image" value={product.image} onChange={handleChange}/>
			
        <FormLabel htmlFor="name">Name: </FormLabel>
        <Input sx={{height: 30}} type="text" name="name" value={product.name} onChange={handleChange}/>
            
				<FormLabel htmlFor="category">Category: </FormLabel>
        <Input sx={{height: 30}}type="text" name="category" value={product.category} onChange={handleChange}/>
		
				<FormLabel htmlFor="price">Price: </FormLabel>
        <Input sx={{height: 30}} type="number" name="price" value={product.price} onChange={handleChange}/>
        <input className='submit' type="submit" value='submit'/>

        </FormGroup>
      </form>
      </details>
    {/* <details>
      <summary>Add</summary>
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
    </>
  )
}

export default Add

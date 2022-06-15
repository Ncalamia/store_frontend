import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'


const Add = (props) => {

	//////States//////
  let emptyProduct = { image: '', name: '', category: '', price: '' }
  const [product, setProduct] = useState(emptyProduct)



	/////Functions///////
const handleChange = (event) => {
	console.log(event);
  	setProduct({ ...product, [event.target.name]: event.target.value })
}



const handleSubmit = (event) => {
  event.preventDefault()
  console.log(product)
  props.handleCreate(product)

	setProduct({image:'', name: '', category: '', price: '' })
}

  return (
    <>
    <details>
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
        <Button type="submit">submit</Button>
      </form>
      </details>
    </>
  )
}

export default Add

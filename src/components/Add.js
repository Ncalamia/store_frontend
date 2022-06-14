import React, { useState, useEffect } from 'react'


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
      <form onSubmit={handleSubmit}>
        <label htmlFor="multi">Image: </label>
        <input type="file" id="image" accept="image/*" onChange={(e)=>setProduct({image:e.target.files[0]})}/>
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
    </>
  )
}

export default Add

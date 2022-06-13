import React, { useState, useEffect } from 'react'


const Add = (props) => {

	//////States//////
  let emptyProduct = { image: 'https://arcane-sea-71685.herokuapp.com/products/products/', name: '', category: '', price: '' }
  const [product, setProduct] = useState(emptyProduct)

	// let emptyFile = { image: 'https://arcane-sea-71685.herokuapp.com/products/products/', name: '', category: '', price: '' }
	// const [file, setFile] = useState(emptyFile)

	/////Functions///////
const handleChange = (event) => {
	console.log(event);
  	setProduct({ ...product, [event.target.name]: event.target.value })
}

// const handleImageChange = (event) => {
// 	setFile(event.target.file)
// }
// const handleImageChange = (event) => {
// setProduct({ ...product, [event.target.name]: event.target.file[0] })
// }

const handleSubmit = (event) => {
  event.preventDefault()
  props.handleCreate(product)
	console.log(product);
	setProduct({image: '', name: '', category: '', price: '' })
}

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={product.name} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="multi">Image: </label>
        <input type="file" name="image" accept="image/*" multiple onChange={handleChange}/>
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

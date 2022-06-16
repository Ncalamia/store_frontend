import React, { useState, useEffect } from 'react'


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

  return (
    <>
    <details>

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
      </details>
    </>
  )
}

export default Edit

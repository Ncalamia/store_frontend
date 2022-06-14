////////////////////////////////////////////////////////////
// setup
////////////////////////////////////////////////////////////


import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'


const App = () => {

  ////////////////////////////////////////////////////////////
  // states
  ////////////////////////////////////////////////////////////
  
  let [products, setProducts] = useState([])
  const herokuURL = 'https://arcane-sea-71685.herokuapp.com/api/products'
  const localURL = 'http://localhost:8000/api/products'




  ////////////////////////////////////////////////////////////
  // read
  ////////////////////////////////////////////////////////////

  const getProducts = () => {
    axios
      .get(herokuURL)
      .then(
        (response) => setProducts(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }


  ////////////////////////////////////////////////////////////
  // create
  ////////////////////////////////////////////////////////////

  const handleCreate = (addProduct) => {
    axios
      .post(herokuURL, addProduct, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response)
        setProducts([...products, addProduct])

    })
  }

  ////////////////////////////////////////////////////////////
  // Handle update
  ////////////////////////////////////////////////////////////

  const handleUpdate = (editProduct) => {
    // console.log(editProduct)
    // console.log(editProduct.id)
    axios
      .put(herokuURL + '/' + editProduct.id, editProduct, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setProducts(products.map((product) => {
          return product.id !== response.data.id ? product :
            response.data
        }))
      })
  }

  ////////////////////////////////////////////////////////////
  // Handle delete
  ////////////////////////////////////////////////////////////

  const handleDelete = (deletedProduct) => {
    axios
      .delete(herokuURL + '/' + deletedProduct.id)
      .then((response) => {
        setProducts(products.filter(product => product.id !== deletedProduct.id))
      })
  }


  ////////////////////////////////////////////////////////////
  // use effect
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    getProducts()
  }, [])

  ////////////////////////////////////////////////////////////
  // return = what renders to the page
  ////////////////////////////////////////////////////////////

  return (
    <div>
      <h1>Add product</h1>
      <div className="add">
        <br/>
        <Add handleCreate={handleCreate} />
        <br/>
      </div>
      <h1>Products</h1>
      {products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <img src={product.image} />
            <h5>Name: {product.name}</h5>
            <h4>Category: {product.category}</h4>
            <h4>Price: {product.price}</h4>
            <Edit handleUpdate={handleUpdate} product={product} />
            <button onClick={() => { handleDelete(product) }} value={product.id}>DELETE</button>
          </div>
        )
      })}
    </div>
  )
}

export default App;

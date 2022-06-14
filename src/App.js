import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
const App = () => {

////States/////
  let [products, setProducts] = useState([])

  const herokuURL = 'https://arcane-sea-71685.herokuapp.com/api/products'
  const localUrl = 'http://localhost:8000/api/products'

//////Fetching Data/////////
  const getProducts = () => {
    axios
    .get(herokuURL)
    .then(
      (response) => setProducts(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }


///////On Page Load////////
  useEffect(() => {
    getProducts()
  }, [])

///////Functions//////////
const handleCreate = (add)=>{
  axios.post(herokuURL, add, {headers: {
    'content-type': 'multipart/form-data'
  }}).then((response)=>{
    console.log(response)
    setProducts([...products, add])
 
  })
}

    /////////////////DELETE///////////////////////////////
    const handleDelete = (event, deletedProduct) => {
      axios

        .delete(herokuURL+'/' + event.target.value) 
 .then((response) => {
          getProducts()

   

        })
    }
/////////////////Update///////////////////////////////
const handleUpdate = (editProduct) => {
  console.log(editProduct)
  // console.log(editProduct.id)
  axios
    .put(herokuURL + '/' + editProduct.id, editProduct, {headers: {
      'content-type': 'multipart/form-data'
    }})
    .then((response) => {
      setProducts(products.map((product) => {
        return product.id !== response.data.id ? product :
          response.data
      }))
    })
}

  return (
    <div>
    <Add handleCreate={handleCreate}/>
      {products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <h4>Name: {product.name}</h4>
            <img src={product.image}/>
            <h4>Category: {product.category}</h4>
            <h4>Price: {product.price}</h4>
            <Edit handleUpdate={handleUpdate} product={product}/>
            <button onClick={()=>{handleDelete(product)}} value={product.id}>DELETE</button>
          </div>
        )
      })}
    </div>
  )
}

export default App;

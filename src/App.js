import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add.js'

const App = () => {

////States/////
  let [products, setProducts] = useState([])


//////Fetching Data/////////
  const getProducts = () => {
    axios
    .get('https://arcane-sea-71685.herokuapp.com/api/products')
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
  const handleCreate = (addProduct) => {
    console.log(addProduct);
    axios
      .post('https://arcane-sea-71685.herokuapp.com/api/products', addProduct)
      .then((response) => {
        console.log(response)
        setProducts([...products,addProduct])
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
          </div>
        )
      })}
    </div>
  )
}

export default App;

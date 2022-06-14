import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add.js'

const App = () => {

////States/////
  let [products, setProducts] = useState([])

  const localURL = 'http://localhost:8000/api/products'
  const herokuURL = 'https://arcane-sea-71685.herokuapp.com/api/products'

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
    setProducts([...products, response.data])
 
  })
}

    /////////////////DELETE///////////////////////////////
    const handleDelete = (event, deleted) => {
      axios
        .delete(herokuURL + event.target.value) 
        .then((response) => {
          getProducts()

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
            <button onClick={handleDelete} value={product.id}>DELETE</button>
          </div>
        )
      })}
    </div>
  )
}

export default App;

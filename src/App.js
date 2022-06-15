import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Welcome from './components/Welcome.js'
import Login from './components/Login.js'
import Main from './components/Main.js'

const App = () => {

  //////////////////////////////////////////////
  //states
  //////////////////////////////////////////////

  // general states
  let [products, setProducts] = useState([])
  let [users, setUsers] = useState([])


  // view states
  //change views without navigating - testing purposes only (deploy view at welcome)
  // let [view, setView] = useState('welcome')
  let [view, setView] = useState('main')
  // let [view, setView] = useState('login')

  // deplpoy with herokuURLs
  const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
  const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
  const localUrl = 'http://localhost:8000/api/products'
  const localUsersUrl = 'http://localhost:8000/api/useraccount'


  //////////////////////////////////////////////
  // fetching the data from the backend 
  //////////////////////////////////////////////

  //////Fetching products/////////
  const getProducts = () => {
    axios
      .get(localUrl)
      .then(
        (response) => setProducts(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  //////Fetching users/////////
  const getUsers = () => {
    axios
      .get(localUsersUrl)
      .then(
        (response) => setUsers(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  //////////////////////////////////////////////
  // useEffect
  //////////////////////////////////////////////

  useEffect(() => {
    if (view === 'login') {
      getUsers()
    } else {
      getProducts()
    }
  }, [])

  //////////////////////////////////////////////
  // the return - skeleton
  //////////////////////////////////////////////


  if (view === 'welcome') {
    return (
      <>
        <Welcome />
      </>
    )
  } else if (view === 'login') {
    return (
      <>

        <Login />

      </>
    )
  } else if (view === 'main') {
    return (
      <>
        <Main />
      </>
    )
  }
}

export default App;

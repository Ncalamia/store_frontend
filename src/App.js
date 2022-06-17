import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cart from './components/Cart.js'
import Welcome from './components/Welcome.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Main from './components/Main.js'


const App = () => {

  //////////////////////////////////////////////
  //states
  //////////////////////////////////////////////

  // general states
  let [products, setProducts] = useState([])
  let [users, setUsers] = useState([])
  let [regulars, setRegulars] = useState([])


  // view states
  //change views without navigating - testing purposes only (deploy view at welcome)
<<<<<<< HEAD
  // let [view, setView] = useState('welcome')
  let [view, setView] = useState('main')
=======
  // let [view, setView] = useState('main')
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da
  // let [view, setView] = useState('login')
  // let [view, setView] = useState('signup')
  let [view, setView] = useState('welcome')

  // local vs heroku links - deploy with heroku
  const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
  const localUrl = 'http://localhost:8000/api/products'

  const herokuUsersUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount'
  const localUsersUrl = 'http://localhost:8000/api/useraccount'

  const herokuLoginUrl = 'https://arcane-sea-71685.herokuapp.com/api/useraccount/login'
  const localLoginUrl = 'http://localhost:8000/api/useraccount/login'


  //////////////////////////////////////////////
  // fetching the data from the backend
  //////////////////////////////////////////////

  //////Fetching products/////////
  const getProducts = () => {
    axios
<<<<<<< HEAD
=======
      // .get(localUrl)
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da
      .get(herokuUrl)
      .then(
        (response) => setProducts(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  //////Fetching users/////////
  const getUsers = () => {
    axios
<<<<<<< HEAD
=======
      // .get(localUsersUrl)
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da
      .get(herokuUsersUrl)
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
    if (view === 'signup') {
      getUsers()
    } else if (view === 'main') {
      getProducts()
    } else if (view === 'welcome') {
      getProducts()
    }
    else {
      getUsers()
    }
  }, [])

  //////////////////////////////////////////////
  // the return - skeleton
  //////////////////////////////////////////////


  if (view === 'welcome') {
    return (
      <>
<<<<<<< HEAD
        <Welcome view={view} setView={setView}/>
=======
        <Welcome view={view} setView={setView} />
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da
      </>
    )
  } else if (view === 'login') {
    return (
      <>

<<<<<<< HEAD
        <Login view={view} setView={setView}/>
=======
        <Login view={view} setView={setView} />

      </>
    )
  } else if (view === 'signup') {
    return (
      <>

        <Signup view={view} setView={setView} />
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da

      </>
    )
  } else if (view === 'main') {
    return (
      <>
<<<<<<< HEAD
        <Main view={view} setView={setView}/>
=======
        <Main view={view} setView={setView} />
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da
      </>
    )
  }
}

export default App;

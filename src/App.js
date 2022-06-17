import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  // let [view, setView] = useState('main')
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
      // .get(localUrl)
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
      // .get(localUsersUrl)
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
        <Welcome view={view} setView={setView} />
      </>
    )
  } else if (view === 'login') {
    return (
      <>

        <Login view={view} setView={setView}/>

      </>
    )
  } else if (view === 'signup') {
    return (
      <>

        <Signup view={view} setView={setView} />

      </>
    )
  } else if (view === 'main') {
    return (
      <>
        <Main view={view} setView={setView} />
      </>
    )
  }
}

export default App;

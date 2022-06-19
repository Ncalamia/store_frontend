import React, { useState, useEffect } from 'react'
import Main from './Main.js'

const AddUser = (props) => {


  //////States//////

  let emptyUser = { email: '', password: '', name: '' }
  const [user, setUser] = useState(emptyUser)
  // let [accounts, setAccounts] = useState('new')
  // const [seePassword, setSeePassword] = useState(false)


  /////Functions///////

  /////Hide/Show password/////
  // const togglePassword = () => {
  //   if (seePassword === false) {
  //     setSeePassword(true)
  //   } else if (seePassword === true) {
  //     setSeePassword(false)
  //   }
  // }

  const handleChange = (event) => {
    console.log(event);
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(user)
    props.userSignup(user)
    setUser({ email: '', password: '', name: '' })
    props.setView('login')
  }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={user.email} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input name="password" value={user.password} onChange={handleChange} />
          {/* <input name="password" value={user.password} onChange={handleChange} type={seePassword ? "text" : "password"} /> */}
          {/* <i onClick={togglePassword}>{props.eye}</i> */}
          <br />
          <br />
          <input type="submit" />
        </form>
      </>
    )
  }

export default AddUser

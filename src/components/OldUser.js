import React, { useState, useEffect } from 'react'


const OldUser = (props) => {

	//////States//////
  const [regular, setRegular] = useState({...props.regular})
  const [seePassword, setSeePassword] = useState(false)


	/////Functions///////

  /////Hide/Show password/////
    const togglePassword = () => {
      if (seePassword === false) {
      setSeePassword(true)
      } else if (seePassword === true) {
      setSeePassword(false)
      }
    }

    const handleChange = (event) => {
        // console.log(event);
        setRegular({ ...regular, [event.target.name]: event.target.value })
    }


    const handleSubmit = (event) => {
      event.preventDefault()
      // console.log(regular)
      props.handleUpdateUser(regular)
    }


  return (
    <>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email: </label>
                  <input type="text" name="email" value={regular.email} onChange={handleChange} />
                  <br />
                  <br />
                  <label htmlFor="password">Password: </label>
                  <input name="password" value={regular.password} onChange={handleChange} type={seePassword ? "text" : "password"} />
                  <i onClick={togglePassword}>{props.eye}</i>
                  <br />
                  <br />
                  <input type="submit" />
              </form>
    </>
  )
}

export default OldUser

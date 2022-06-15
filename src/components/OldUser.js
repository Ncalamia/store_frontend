import React, { useState, useEffect } from 'react'


const OldUser = (props) => {

	//////States//////
  let emptyUser = { email: '', password: '' }
  const [user, setUser] = useState(emptyUser)



	/////Functions///////

    const handleChange = (event) => {
        console.log(event);
          setUser({ ...user, [event.target.name]: event.target.value })
    }


    const handleSubmit = (event) => {
      event.preventDefault()
      console.log(user)
      // props.handle(user)
      setUser({ email: '', password: ''  })
      props.setView('main')
    }


  return (
    <>
    
    
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email: </label>
                  <input type="text" name="email" value={user.email} onChange={handleChange} />
                  <br />
                  <br />
                  <label htmlFor="password">Password: </label>
                  <input type="text" name="password" value={user.password} onChange={handleChange} />
                  <br />
                  <br />
                  <input type="submit" />
              </form>
    </>
  )
}

export default OldUser

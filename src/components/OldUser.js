import React, { useState, useEffect } from 'react'


const OldUser = (props) => {

	//////States//////
  const [regular, setRegular] = useState({...props.regular})


	/////Functions///////

    const handleChange = (event) => {
        // console.log(event);
        setRegular({ ...regular, [event.target.name]: event.target.value })
    }


    const handleSubmit = (event) => {
      event.preventDefault()
<<<<<<< HEAD
      console.log(user)
      // props.handle(user)
      setUser({ email: '', password: ''  })
      // props.setView('main')
=======
      // console.log(regular)
      props.handleUpdateUser(regular)
>>>>>>> 7f490d0d2bbf97ece1fe2a82b7ae94f99fff02da
    }


  return (
    <>
    
    
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email: </label>
                  <input type="text" name="email" value={regular.email} onChange={handleChange} />
                  <br />
                  <br />
                  <label htmlFor="password">Password: </label>
                  <input type="password" name="password" value={regular.password} onChange={handleChange} />
                  <br />
                  <br />
                  <input type="submit" />
              </form>
    </>
  )
}

export default OldUser

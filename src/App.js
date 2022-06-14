import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AddUser from './components/AddUser.js'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {

////States/////
  let [products, setProducts] = useState([])
  let [view, setView] = useState('welcome')
  const herokuUrl = 'https://arcane-sea-71685.herokuapp.com/api/products'
  const localUrl = 'http://localhost:8000/api/products'

////Auth States/////
  let [users, setUsers] = useState([])


//////Fetching Data/////////
  const getProducts = () => {
    axios
    .get(localUrl)
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
  axios.post(localUrl, add, {headers: {
    'content-type': 'multipart/form-data'
  }}).then((response)=>{
    console.log(response)
    console.log(response.data.id)
    setProducts([...products, response.data])
 
  })
}

    /////////////////DELETE///////////////////////////////
    const handleDelete = (event, deleted) => {
      axios
        .delete(localUrl + '/' + event.target.value) 
        .then((response) => {
          getProducts()

        })
    }
/////////////////Update///////////////////////////////
const handleUpdate = (updateProduct) => {
    console.log(updateProduct.id)
  axios
    .put(localUrl +'/' + updateProduct.id, updateProduct)
    .then((response) => {
      getProducts()
      setProducts(products.map((product)=>{
        return product.id !=response.data.id ? product : response.data
      }))
      
    })
}
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [];

const theme = createTheme({
  palette: {
    primary: {
    
      main: '#ff4400',

    }
  }
})


  if (view === 'welcome') {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>

              <Typography variant="h6" color="inherit" noWrap>
                Home.
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Essentials.
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Welcome!
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button variant="contained">Browse Categories</Button>

                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid item key={product} xs={12} sm={6} md={4}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: '56.25%',
                        }}
                        image={product.image}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography>
                          Price: {product.price}$
                        </Typography>
                      </CardContent>

                    </Card>

                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>

            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Created by Nikki, Jacqueline and Yulia.
            </Typography>
            <Copyright />
          </Box>

        </ThemeProvider>
      </>
    )
  } else if (view === 'login') {
    return (
      <>
        <h1>Login</h1>
        <AddUser/>
      </>
    )
  } else if (view === 'main') {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>

              <Typography variant="h6" color="inherit" noWrap>
                Home.
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Button variant="outlined"><Add handleCreate={handleCreate} /></Button>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Essentials.
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Welcome!
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button variant="contained">Browse Categories</Button>

                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid item key={product} xs={12} sm={6} md={4}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: '56.25%',
                        }}
                        image={product.image}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography>
                          Price: {product.price}$
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={handleDelete} value={product.id}>Delete</Button>
                        <Edit handleUpdate={handleUpdate} id={product.id} />
                      </CardActions>
                    </Card>

                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>

            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Created by Nikki, Jacqueline and Yulia.
            </Typography>
            <Copyright />
          </Box>

        </ThemeProvider>
      </>
      // <div className='container'>
      //   <div >
      //   <header>HOME</header>
      //   </div>
      // <Add handleCreate={handleCreate}/>
      //   {products.map((product) => {
      //     return (
      //       <div className="product" key={product.id}>
      //         <h4>Name: {product.name}</h4>
      //         <img src={product.image}/>
      //         <h4>Category: {product.category}</h4>
      //         <h4>Price: {product.price}</h4>
      //         <Edit handleUpdate={handleUpdate} id={product.id}/>
      //         <button onClick={handleDelete} value={product.id}>DELETE</button>
      //       </div>
      //     )
      //   })}
      // </div>
    )
  }
}

export default App;

import React, {useState, useEffect, useRef} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  select:{
    display: 'block'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AgregarProducto() {
  const classes = useStyles();

  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const ratingRef = useRef(null)
  const imageRef = useRef(null)
  const descriptionRef = useRef(null)
  const catidRef = useRef(null)
  const useridRef = useRef(null)

  const [users, setUsers] = useState([])
  const [categories,setCategories] = useState([])
  const rating = [{rating: 1},{rating:2},{rating:3},{rating:4},{rating:5}]

  const addProduct = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const price = parseInt(priceRef.current.value)
    const rating = ratingRef.current.value
    const image = imageRef.current.value
    const description = descriptionRef.current.value
    const catid = catidRef.current.value
    const userid = useridRef.current.value

    console.log(name)

    const body = JSON.stringify({
      name,
      price,
      rating,
      image,
      description,
      catid,
      userid
    })
    const token = JSON.parse(localStorage.getItem('loggedEcommerceUser')).token
 
    console.log(token)
    const result = await fetch("http://localhost:5000/products",{
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
      }
    })
    const data = result.json()
    console.log(data) 
  }

  const loadCategories = async () => {
    const response = await fetch('http://localhost:5000/categories')
    const data = await response.json()
    setCategories(data.data)
}
  const loadUsers = async () => {
    const response = await fetch('http://localhost:5000/user')
    const data = await response.json()
    console.log(data)
    setUsers(data.data)
  }
  useEffect(() => {
    loadCategories()
    loadUsers()
  },[])


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Agregar Producto
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoFocus
            inputRef={nameRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Precio"
            name="price"
            autoFocus
            inputRef={priceRef}
          />
          <TextField className={classes.select}
          id="outlined-select-currency"
          select
          helperText="Select rating"
          inputRef={ratingRef}
        >
          {
          rating.map((option) => (
            <MenuItem key={option.rating} value={option.rating}>
              {option.rating}
            </MenuItem>
          ))}
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="image"
            label="Imagen URL"
            name="image"
            autoFocus
            inputRef={imageRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Descripcion"
            name="description"
            autoFocus
            inputRef={descriptionRef}
          />
          <TextField className={classes.select}
            id="outlined-select-currency"
            select
            helperText="Select category"
            inputRef={catidRef}
          >
          {
          categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
          </TextField>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addProduct}
          >
            Agregar
          </Button>
        </form>
      </div>
    </Container>
  );
}
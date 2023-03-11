import React, { useState, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import EditProductForm from '../components/EditProductForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export default function EditarProducto() {
  const { id } = useParams()
  const classes = useStyles();

  const [product, setProduct] = useState(null)

  const loadProduct = async () => {
    const response = await fetch(`http://localhost:5000/products/${id}`)
    const data = await response.json()
    setProduct({ ...data.data })
  }
  useEffect(() => {
    loadProduct()
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Editar producto
        </Typography>
        {product ? <EditProductForm initialValues={product} /> : <div>Loading</div>}
      </div>
    </Container>
  );
}

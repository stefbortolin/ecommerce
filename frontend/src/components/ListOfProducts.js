import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import { useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  Grid: {
    maxWidth: "100%",
    /* justifyContent: "center" */
  },
}));


export default function ListOfProducts({products}) { 

  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid className={classes.Grid} container spacing={3}>
          {products.map(product => (
            <Grid key={`prodid:${product.id}`} item >
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
      
  );
}

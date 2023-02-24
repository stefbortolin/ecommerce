import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import products from '../product-data';
import CheckoutCard from './CheckoutCard';
import Total from './Total';
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem",
        marginTop: "30px"
    }
}))

const CheckoutPage = () => {
    const classes = useStyles()
    const [{cart}, dispatch] = useStateValue()

    function FormRow() {
        return (
            <React.Fragment>
                {
                    cart?.map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <CheckoutCard key={item.id} product={item}/>
                        </Grid>
                    ))
                }
            </React.Fragment>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant='h4'>
                         Carro de Compras
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align='center' gutterBottom variant='h4'>
                        <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CheckoutPage
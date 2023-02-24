import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm, FormProvider } from 'react-hook-form'
import AddressInput from './AddressInput';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
import { useStateValue } from '../../StateProvider'
import { actionsTypes } from '../../reducer';

export default function AddressForm({nextStep}) {
  const methods = useForm()
  const [{shippingData}, dispatch] = useStateValue()
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data=>{
          dispatch({
            type: actionsTypes.SET_SHIPPINGDATA,
            shippingData: data
          })
          nextStep()
        })}>
      <Grid container spacing={3}>
        <AddressInput name="firstName" label="First Name" />
        <AddressInput name="lastName" label="Last Name" />
        <AddressInput name="email" label="Email" />
        <AddressInput name="postalCode" label="Postal Code" />
        <AddressInput name="streetName" label="Street Name" />
        <AddressInput name="streetNumber" label="Street Number" />
      </Grid>
      <div style={{display:"flex", justifyContent:"space-between",marginTop:"1rem"}}>
        <Button component={Link} to='/checkout-page'>Back to Checkout Page</Button>
        <Button type="sumbit" variant="contained" color="primary">Next</Button>
      </div>
      </form>
      </FormProvider>
    </React.Fragment>
  );
}

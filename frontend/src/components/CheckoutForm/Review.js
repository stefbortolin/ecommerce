import React, { useState } from 'react'
import { Button, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import { useStateValue } from '../../StateProvider'
import { getTotalCart } from '../../reducer'
import { Navigate, redirect } from 'react-router-dom'
import axios from 'axios'

const Review = ({prevStep}) => {
  const [{cart, shippingData}, dispatch] = useStateValue()

  const createOrder = async (cart) => {
    const token = JSON.parse(localStorage.getItem('loggedEcommerceUser')).token
    const products = cart.map(({id,quantity}) => {
      return{
        id,
        quantity
      }
    })
    
    const result = await axios.post("http://localhost:5000/productDetail", products, {
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    console.log(result)

  }



  const apiMP = async (e) => {
    e.preventDefault()

    const items = []
    cart.map(product => {
      items.push({
        id: product.id,
        title: product.name,
        currency_id : 'ARS',
        picture_url: product.image,
        quantity: product.quantity,
        unit_price: product.price
      })
    })
    const payer = {
      name: shippingData.firstName,
      surname: shippingData.lastName,
      email: shippingData.email,
      adress: {
        zip_code: shippingData.postalCode,
        street_name: shippingData.streetName,
        street_number: shippingData.streetNumber
      }
    }
    console.log(payer)
    const body = {
      items,
      payer
    }
    console.log(body)
    const result = await axios.post("http://localhost:5000/payment", body)
    window.location.href = result.data.response.body.init_point
    // ---------------  ORDER ------------------
    
    createOrder(cart)

  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {
          cart?.map(product => {
            return(
            <ListItem key={product.id}>
              <ListItemText primary={product.name} secondary={product.quantity}/>
              <Typography variant="body2">
                ${product.price}
              </Typography>
            </ListItem>
            )
          })
        }
        <ListItem>
          <ListItemText primary="Total"/>
            <Typography variant="subtitle1">
              ${getTotalCart(cart)}
            </Typography>
        </ListItem>
      </List>
      <div style={{display:"flex", justifyContent:"space-between",marginTop:"1rem"}}>
        <Button onClick={()=>{prevStep()}}>Back</Button>
        <Button onClick={apiMP} variant="contained" color="primary">Comprar</Button>
      </div>
    </div>
  )
}

export default Review

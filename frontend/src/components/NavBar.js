import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {ShoppingCart} from '@material-ui/icons';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    backgroundColor: "#000",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
    color: "#fff",
    borderInlineColor: "#fff",
    borderBlockColor: "#fff",
    textDecorationColor:"#fff"
  },
  image: {
    marginRight: "10px",
    height: "40px",
  },
}));




export default function NavBar() {
  const classes = useStyles();
  const [{cart}, dispatch] = useStateValue()
  const [user, setUser] = useState(null)

  const loadUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedEcommerceUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }
  useEffect(()=> {
    loadUser()
  },[])

  const notLoggedBar = () =>{
    return (
      <>
      <Typography variant="h6" color="white" component="p">
        Hola Invitado
      </Typography>
      <div className={classes.button}>
            <Link to="/signin">
              <Button variant="outlined" className={classes.button}>
                  <strong >Ingresar</strong>
              </Button>
            </Link>
            <Link to="/checkout-page">
              <IconButton aria-label="show cart items" className={classes.button}>
                  <Badge badgeContent={cart?.length} >
                      <ShoppingCart fontSize="large" />
                  </Badge>
              </IconButton>
            </Link>
      </div>
      </>
     )
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedEcommerceUser')
    window.location.reload(true)
  }
  const buttonToDashboard = () => {
    return (
      <Link to="/eliminarproducto">
        <Button type="submit" className={classes.button}  >
            <strong>Products</strong>
        </Button>
      </Link>
    )
  }
  const loggedBar = (user) =>{
    return(
    <>
    <Typography variant="h6" color="white" component="p">
      Hola {user.username}
    </Typography>
    <div className={classes.button}>
          {
            user.role === 'ADMIN' && buttonToDashboard()
          }
            <Button variant="outlined" type="submit" className={classes.button} onClick={()=>{logOut()}} >
                <strong>Log Out</strong>
            </Button>
          <Link to="/checkout-page">
            <IconButton aria-label="show cart items" className={classes.button}>
                <Badge badgeContent={cart?.length} >
                    <ShoppingCart fontSize="large"  />
                </Badge>
            </IconButton>
          </Link>
    </div>
    </>
    )
  }


  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <h3> ECOMMERCE </h3>
            </IconButton>
          </Link>
          <div className={classes.grow} />
          {
            user 
              ? loggedBar(user)
              : notLoggedBar()
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

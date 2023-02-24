import { ClassNames } from "@emotion/react";
import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { getTotalCart } from "../reducer";
import { getTotalLenght } from "../reducer";
import { useStateValue } from '../StateProvider';
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        height:"20vh"
    },
    button: {
        marginTop: "2rem"
    }
}))

const Total = () => {
    const [{cart}, dispatch] = useStateValue()
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h5> Total Items: {getTotalLenght(cart)} </h5>
            <h5> ${getTotalCart(cart)} </h5>
            <Link to="/checkout">
                <Button className={classes.button} variant="contained" color="primary">
                    CheckOut
                </Button>
            </Link>
        </div>
    )
}  

export default Total
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    select: {
        display: 'block',
        minWidth: "200px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EditProductForm = ({ initialValues }) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([])

    const [formData, setFormData] = useState(initialValues)


    const rating = [{ rating: 1 }, { rating: 2 }, { rating: 3 }, { rating: 4 }, { rating: 5 }]
    const loadCategories = async () => {
        const response = await fetch('http://localhost:5000/categories')
        const data = await response.json()
        setCategories(data.data)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const updateProduct = async (e) => {
        e.preventDefault()

        const body = JSON.stringify({
            name: formData.name,
            price: parseInt(formData.price),
            rating: formData.rating,
            image: formData.image,
            description: formData.description,
            catid: formData.catid,
            stock: parseInt(formData.stock)
        })
        console.log(body)
        const result = await fetch(`http://localhost:5000/products/${formData.id}`, {
            method: 'PUT',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await result.json()
        console.log(data)
    }

    const handleChange = (e, input) => {
        setFormData({ ...formData, [input]: e.target.value })
    }


    return (
        <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={formData.name}
                onChange={(e) => handleChange(e, 'name')}
                id="name"
                label="Nombre"
                name="name"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={formData.price}
                onChange={(e) => handleChange(e, 'price')}
                id="price"
                label="Precio"
                name="price"
                autoFocus
            />
            <TextField className={classes.select}
                id="outlined-select-currency"
                select
                value={formData.rating}
                onChange={(e) => handleChange(e, 'rating')}
                label="Rating"
                helperText="Select rating"
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
                fullWidth
                value={formData.image}
                onChange={(e) => handleChange(e, 'image')}
                id="image"
                label="Imagen"
                name="image"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={formData.description}
                onChange={(e) => handleChange(e, 'description')}
                id="description"
                label="Descripcion"
                name="description"
                autoFocus
            />
            <TextField className={classes.select}
                id="outlined-select-currency"
                select
                sx={{ minWidth: "200px" }}
                value={formData.catid}
                onChange={(e) => handleChange(e, 'catid')}
                label="Categoria"
                helperText="Select category"
            >
                {
                    categories.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
            </TextField>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={formData.stock}
                onChange={(e) => handleChange(e, 'stock')}
                id="stock"
                label="Stock"
                name="stock"
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={updateProduct}
            >
                Editar
            </Button>
        </form>
    )
}

export default EditProductForm

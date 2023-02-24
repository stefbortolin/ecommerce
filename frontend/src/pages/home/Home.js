import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../../components/SideBar';
import { IconButton } from '@material-ui/core';
import { useParams, Link} from 'react-router-dom';
import ListOfProducts from '../../components/ListOfProducts';
import './Home.css'

const useStyles = makeStyles((theme) => ({
    body: {
        width: "100%",
    },
    sidebar: {
        width: "15%",
        /* borderRight: "1px solid gray", */
        textAlign: "center",
        marginLeft: "10px"
    },
    container: {
        width:"100%",
        display: "flex",
        minHeight: "80vh"
    },
    titleList: {
        paddingBottom: "20px",
        fontSize: "30px"

    }
  }));

  const INITIAL_PAGE = 0

export default function Home (){
    let {cat} = useParams()

    const [page,setPage] = useState(INITIAL_PAGE)

    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])

    const classes = useStyles();

    const loadProducts = async () => {
        let offset = page * 5
        const response = await fetch(`http://localhost:5000/products?offset=${offset}`)
        const data = await response.json()
        setProducts(data.data)
    }

    const loadCategories = async () => {
        const response = await fetch('http://localhost:5000/categories')
        const data = await response.json()
        setCategories(data.data)
    }

    const loadProductsCat = async (cat) => {
        console.log("le estoy mandando " + cat)
        let offset = page*5 
        const response = await fetch(`http://localhost:5000/products/category/${cat}?offset=${offset}`)
        const data = await response.json()
        setProducts(data.data)
        console.log(products)
    }
    
    useEffect(() => {
    if (cat !== undefined) {
        loadProductsCat(cat)
    }
    else {
        loadProducts()
    }
    loadCategories()
    
    },[page])

    const handleNextPage = () => setPage ( page => page + 1)
    const handlePrevPage = () => setPage ( page => page - 1)
    return(
    <div className={classes.container} >
        <div className={classes.sidebar}>
            <h4 className={classes.titleList}>Categorias</h4>
            <ul>
            {categories.map(category => (
                <Link to={`/${category.name}`} key={`catid:${category.id}`}>
                        <button className="button-category" role="button">
                            <SideBar category={category} />
                        </button>
                </Link>
            ))}
            </ul>
        </div>
        <div className={classes.body}>
            <div >
                <ListOfProducts products={products}/>
            </div>
            <div class="button-container">
                {
                    (page > 0) && 
                <button className="button-page" role="button" onClick={handlePrevPage}>
                    <h4>Pagina anterior</h4>
                </button>
                }
                <button className="button-page" role="button" onClick={handleNextPage}>
                    <h4>Siguiente pagina</h4>
                </button>
            </div>
        </div>
    </div>
    )




}
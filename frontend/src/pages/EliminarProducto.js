import React , {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(2),
    color: "#fff",
    borderInlineColor: "#fff",
    borderBlockColor: "#fff",
    textDecorationColor:"#fff",
  },
}))




export default function EliminarProducto() {
  const classes = useStyles();

    const [products,setProducts] = useState([])
    const [rows, setRows] = useState([])

    

    const loadProducts = async () => { 
        const response = await fetch(`http://localhost:5000/products`)
        const data = await response.json()
        console.log(data.data)
        setProducts(data.data)
    }

    useEffect(()=> {
        loadProducts()
    
    },[])
    
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'image', headerName: 'ImageURL', width: 130 },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
    
    renderCell: (params) => {
        const deleteProduct = async () => {
          const currentRow = params.row
          console.log(currentRow.id)
          setRows(rows => {
            return [...rows.filter((row) => row.id != currentRow.id)]
          })
          console.log(rows)
          await fetch(`http://localhost:5000/products/${currentRow.id}`,{
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json"
            }
          }) 
        };
        
        return (
          <Stack direction="row" spacing={2}>
            <Link to={`/editarproducto/${params.row.id}`}>
              <Button variant="outlined" color="warning" size="small">Edit</Button>
            </Link>
            <Button variant="outlined" onClick={deleteProduct} startIcon={<DeleteIcon />}></Button>
          </Stack>
        );
    },
  }

];


    useEffect(()=> {
      products.forEach(({id,name,description,price,image}) =>{
        setRows(rows => [...rows, {id,name,description,price,image}
        ])
      }) 
      },[products])



    return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h2">
        Eliminar Producto
      </Typography>
      <Link to="/agregarproducto">
        <div className={classes.button}>
        <Button type="submit"   >
            <strong>Agregar Producto</strong>
        </Button>
        </div>
      </Link>

      <div style={{ height: 400, width: '100%' }}>
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          />
      </div>
    </div>
    );
}

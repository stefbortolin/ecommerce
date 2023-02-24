import mysql from 'mysql'
import  db  from '../config'

console.log(db)

var conexion = mysql.createConnection(
    {
        user: db.db.user,
        password: db.db.password,
        host: db.db.host,
        database: db.db.database,
    }
)
conexion.connect(function(error) {
    if(error){
        throw error
    } else {
        console.log("conexion exitosa")
    }
})
export default conexion

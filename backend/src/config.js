import {config} from 'dotenv'
config()


export default {
    port: process.env.PORT,
    db : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DATABASE,
    }
}
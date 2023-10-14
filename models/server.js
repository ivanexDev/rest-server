const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config.db')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000
        this.usersPath = '/api/usuarios'

        //Conectar a DB

        this.conectarDB()


        //Middlewares
        this.middlewares()


        //Rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Parseo y lectura del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }
            

    routes(){

        this.app.use(this.usersPath, require("../routes/users.routes"))
        this.app.use("*", (req, res) => { res.status(404).json({mensaje:"Error 404"})})
    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en: http://localhost:${this.port}/`)
        })

    }

}

module.exports = Server;    






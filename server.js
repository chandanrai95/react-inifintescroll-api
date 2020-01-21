
import  {config}  from "./configServer";
import { schema } from './configServer';
import {getInstance } from './app/helper/ModelInstanceHandler';
import UserData from './data/UserData';

const express = require("express");
const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
var cors = require('cors');
const app = express();



const connection = new Sequelize(config.dbname, config.username, config.password , {
    dialect: config.dialect
})

app.sequelizeClient = connection;

app.use(cors())

//------------------------------------------------------------ schema import--------------------------------------------------// 
const schemaPath  = path.join(__dirname, "./app/sequelizeSchema")
const schemaFiles  = fs.readdirSync(schemaPath)

schemaFiles.map(file => {
    const filePath = schemaPath+ "/"+ file;

    if(!fs.statSync(filePath).isDirectory()){
        require(filePath).default(app)
    }
})

//------------------------------------------------------------ schema import--------------------------------------------------//


//------------------------------------------------------------ routes import--------------------------------------------------//

const routePath = path.join(__dirname, './app/routes')

const routeFiles = fs.readdirSync(routePath);

 routeFiles.map( files  => {

    const filePath = routePath + '/' + files

    if(!fs.statSync(filePath).isDirectory())
    {
        const routeFileInstance  = require(filePath);
        const handleFileInstance = require(routeFileInstance.handlerFolderPath);
        const routes = routeFileInstance.routes

        routes.forEach(element => {
            let method = element.method;
            let endpoint = element.endpoint;
            let handler = handleFileInstance[element.handler]
        
            app[method](endpoint, handler)

            console.log(method, endpoint)
        });
    }

 })

//------------------------------------------------------------ routes import--------------------------------------------------//


//------------------------------------------------------------ models--------------------------------------------------//

const Users = getInstance(schema.USERS); 
//------------------------------------------------------------ models--------------------------------------------------//


connection.sync({
    logging: console.log,
    force: false
})
.then(() => {
    console.log("Connection to database is established ");
    app.listen(config.port, function(){
        console.log("Server running on Port ", config.port)
    })
})
.then(() => {
    // Users.bulkCreate(UserData)  // use to feed data in table
})
.catch(err => {
    console.log("error Occured",err)
})


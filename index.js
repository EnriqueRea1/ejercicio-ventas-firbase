const express = require("express");
const Rutas = require("./rutas/rutasUsuarios");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", Rutas);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
})
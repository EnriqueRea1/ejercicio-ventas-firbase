var rutas = require("express").Router();
// var {Router} = require("express");

var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorID} = require("../bd/usuariosBD");

rutas.get("/",async(req, res)=>{
    var usuariosValidos = await mostrarUsuarios();
    // console.log(usuariosValidos);
    res.json(usuariosValidos);
    // res.send("Hola estas en raíz");
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var usuarioValido = await buscarPorID(req.params.id);
    res.json(usuarioValido);
});

rutas.get("/borrarUsuario/:id",async(req,res)=>{
    var usuarioBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

module.exports = rutas;
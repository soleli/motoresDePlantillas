const express= require("express");
const path = require("path");
const PORT=8080;

const app= express();



const pathStatic = path.resolve(__dirname, "./public");



// ************ Para usar Post ************
app.use(express.urlencoded({extended:false}));

app.use(express.json());


app.use(express.static(pathStatic));

// Template Engine
app.set('view engine', 'pug');
const productsRoutes = require('./routes/productsRoutes');
app.use('/' ,productsRoutes);

app
.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
.on('error',error=>console.log(`error del servidor:${error}`))
const express= require("express");
const path = require("path");

const { engine } = require('express-handlebars')

const app= express();

const PORT=8080;
const engineFn = engine({
    extname: '.hbs',
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
  })
  
  app.engine('hbs', engineFn)
  
  app.set('views', './views')
  app.set('view engine', 'hbs')
  
const pathStatic = path.resolve(__dirname, "./public");


app.set('views', __dirname + '/views');
app.set('view engine', 'html');
// ************ Para usar Post ************
app.use(express.urlencoded({extended:false}));

app.use(express.json());


app.use(express.static(pathStatic));

const productsRoutes = require('./routes/productsRoutes');
app.use('/' ,productsRoutes);

app
.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
.on('error',error=>console.log(`error del servidor:${error}`))
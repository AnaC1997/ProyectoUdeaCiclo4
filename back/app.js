const express=require("express");
const app=express();
const errorMiddleware =require("./middleware/error")

// App usará herramientas que expres relacionadas a json
app.use(express.json());

//Importamos rutas
const productos=require("./routes/products")
const usuarios=require("./routes/users")

app.use('/api',productos)
app.use('/api',usuarios)

//middleware nos permitira manejar errores
app.use(errorMiddleware)

module.exports=app
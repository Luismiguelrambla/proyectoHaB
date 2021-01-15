require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

// controladores de hoteles
const {
    listHoteles,
    getHotel,
    newHotel,
    editHotel,
    deleteHotel,
    addHotelPhoto,
    deleteHotelPhoto,
} = require('./controllers/hoteles');

// controladores de usuarios
const {
    newUser,
} = require('./controllers/usuarios');

/*const { 
    voteSpaces,
} = require('./controllers/espacios');*/

// middlewares
const hotelExists = require('./middlewares/hotelExists');

const { PORT } = process.env;

// creo la app de express
const app = express();

// aplico middlewares

// logger
app.use(morgan("dev"));

//body parsers (body en JSON)
app.use(bodyParser.json());

// body parser (multipart from data <- subida de imagenes)
app.use(fileUpload());

// static
app.use(express.static(path.join(__dirname, 'static')));

/* 
    Rutas Hoteles API
*/

// GET - /hoteles
//devuelve todos los elementos de la tabla de hoteles
app.get("/hoteles", listHoteles);

// GET - /hoteles/:id
// devuelve un solo hotel
app.get("/hoteles/:id", hotelExists, getHotel);

//POST - /hoteles
// crea un nuevo hotel
app.post("/hoteles", /*hotelExists,*/ newHotel);

// PUT - /hoteles/:id
// edita un hotel en la BBDD
app.put("/hoteles/:id", hotelExists, editHotel);

// DELETE - /hoteles/:id
// borra un hotel en la BBDD
app.delete("/hoteles/:id", hotelExists, deleteHotel);

//POST - /hoteles/:id/photos
// añade una foto a un hotel
app.post("/hoteles/:id/photos", hotelExists, addHotelPhoto)

// DELETE -/hoteles/:id/photos/:photosId
// borra una foto a un hotel
app.delete("/hoteles/:id/photos/:photosId", hotelExists, deleteHotelPhoto);

/* // POST -/hoteles/:id/votes
// vota una entrada
app.post("/hoteles/:id/votes", hotelExists, voteSpaces);*/

/* 
    Rutas usuarios API
*/

// POST -/users
app.post("/users", newUser);

// middleware de error || devuelve .json tiene entrada status error y mensaje error
app.use((error, req, res, next) => {
    res.status(error.httpStatus || 500).send({
        status: "error",
        message: error.message,
    });
});

// middleware 404
app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "Not found",
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT} 🔥`)
});
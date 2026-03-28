require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/db-connection-mongo');

// Inicialización de la aplicación
const app = express();

// Se establece la conexión con la base de datos al arrancar la aplicación
dbConnection();


app.use(cors({
    origin: 'https://peliculasuidigital.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Habilita el parseo de solicitudes en formato JSON
app.use(express.json());

// ----- Rutas de la API -----

app.use('/api/generos', require('./routes/GeneroRoutes'));
app.use('/api/directores', require('./routes/DirectorRoutes'));
app.use('/api/productoras', require('./routes/ProductoraRoutes'));
app.use('/api/tipos', require('./routes/TipoRoutes'));
app.use('/api/media', require('./routes/MediaRoutes'));

// Se define el puerto tomando el valor del entorno (Render asigna uno automáticamente)
const port = process.env.PORT || 4000;

// Puesta en marcha del servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
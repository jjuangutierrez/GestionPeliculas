require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/db-connection-mongo');

const app = express();

dbConnection();

app.use(cors()); 
app.use(express.json());

app.use('/api/generos',    require('./routes/GeneroRoutes'));
app.use('/api/directores', require('./routes/DirectorRoutes'));
app.use('/api/productoras', require('./routes/ProductoraRoutes'));
app.use('/api/tipos',      require('./routes/TipoRoutes'));
app.use('/api/media',      require('./routes/MediaRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
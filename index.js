const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { connectDB } = require('./src/db/connectDB');
const { uploadRoutes } = require('./src/routes/uploads');
const { userRoutes } = require('./src/routes/userRoute');
const { turismoRoutes } = require('./src/routes/turismoRoute');
const { tramiteRoutes } = require('./src/routes/tramite');
const { tiposDocRoutes } = require('./src/routes/tiposDoc');
const { documentosRoutes } = require('./src/routes/documentos');
const { eventosRoutes } = require('./src/routes/eventos');
const { colaboradoresRoutes } = require('./src/routes/colaborador');

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Carga de Archivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
  })
);

// Rutas
userRoutes(app);
uploadRoutes(app);
turismoRoutes(app);
tramiteRoutes(app);
tiposDocRoutes(app);
documentosRoutes(app);
eventosRoutes(app);
colaboradoresRoutes(app);

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto:', port);
});

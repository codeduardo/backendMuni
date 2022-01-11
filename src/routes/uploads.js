const { Router } = require('express');
const { check } = require('express-validator');
const {
  actualizarImagenCloudinary,
  deleteImagenCloudinary,
} = require('../controllers/uploadController');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivo } = require('../helpers/validar-archivo');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const uploadRoutes = (app) => {
  app.use('/api/v1/uploads', router);

  router.put(
    '/imagen/:coleccion/:id',
    [
      validarJWT,
      validarArchivo,
      check('id', 'No es un ID válido').isMongoId(),
      check('coleccion').custom((c) =>
        coleccionesPermitidas(c, ['user', 'turismo', 'eventos', 'colaborador'])
      ),
      validarCampos,
    ],
    actualizarImagenCloudinary
  );
  router.delete(
    '/imagen/:coleccion/:id',
    [
      validarJWT,
      check('id', 'No es un ID válido').isMongoId(),
      check('coleccion').custom((c) =>
        coleccionesPermitidas(c, ['user', 'turismo', 'eventos', 'colaborador'])
      ),
      validarCampos,
    ],
    deleteImagenCloudinary
  );
};

module.exports = { uploadRoutes };

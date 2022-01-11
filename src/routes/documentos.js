const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearDocumento,
  getDocumentos,
  eliminarDocumento,
} = require('../controllers/documentosController');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const documentosRoutes = (app) => {
  app.use('/api/v1/documentos', router);

  router.post(
    '/',
    [
      validarJWT,
      check('name', 'El nombre del documento es obligatorio').not().isEmpty(),
      check('year', 'El año del documento es obligatorio').not().isEmpty(),
      check('file', 'El archivo del documento es obligatorio').not().isEmpty(),
      check('tipo', 'El tipo del documento es obligatorio').not().isEmpty(),
      validarCampos,
    ],
    crearDocumento
  );
  router.get('/', getDocumentos);
  router.delete('/:id', eliminarDocumento);

  return router;
};

module.exports = { documentosRoutes };

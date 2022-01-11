const { Router } = require('express');
const { check } = require('express-validator');
const {
  createTramite,
  getTramites,
} = require('../controllers/tramiteControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const tramiteRoutes = (app) => {
  app.use('/api/v1/tramites', router);

  router.post(
    '/',
    [
      check('tipoDoc', 'El tipo de Documento es obligatorio').not().isEmpty(),
      check('nro_documento', 'El número de documento es obligatorio')
        .not()
        .isEmpty(),
      check('nombres', 'El nombre es obligatorio').not().isEmpty(),
      check('ap_paterno', 'El apellido paterno es obligatorio').not().isEmpty(),
      check('ap_materno', 'El apellido materno es obligatorio').not().isEmpty(),
      check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
      check('direccion', 'La dirección es obligatoria').not().isEmpty(),
      check('tramite', 'El trámite es obligatorio').not().isEmpty(),
      check('file', 'El archivo es obligatorio').isURL(),
      validarCampos,
    ],
    createTramite
  );
  router.get('/', [validarJWT], getTramites);

  return router;
};

module.exports = { tramiteRoutes };

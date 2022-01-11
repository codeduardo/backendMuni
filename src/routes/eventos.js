const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearEvento,
  getEventos,
  deleteEvento,
  getEvento,
  updateEvento,
} = require('../controllers/eventosControllers');
const { existeEventoPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const eventosRoutes = (app) => {
  app.use('/api/v1/eventos', router);

  router.post(
    '/',
    [
      validarJWT,
      check('title', 'El nombre del evento es obligatorio').not().isEmpty(),
      check('description', 'La descripción del evento es obligatoria')
        .not()
        .isEmpty(),
      check('fecha_evento', 'La fecha del evento es obligatoria')
        .not()
        .isEmpty(),
      validarCampos,
    ],
    crearEvento
  );

  router.get('/', getEventos);
  router.get(
    '/:id',
    [
      check('id', 'El id del evento es inválido').isMongoId(),
      check('id').custom(existeEventoPorId),
      validarCampos,
    ],
    getEvento
  );

  router.put(
    '/:id',
    [
      validarJWT,
      check('id', 'El id del evento es inválido').isMongoId(),
      check('id').custom(existeEventoPorId),
      validarCampos,
    ],
    updateEvento
  );

  router.delete(
    '/:id',
    [
      validarJWT,
      check('id', 'El id del evento es inválido').isMongoId(),
      check('id').custom(existeEventoPorId),
      validarCampos,
    ],
    deleteEvento
  );

  return router;
};

module.exports = { eventosRoutes };

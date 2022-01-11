const { Router } = require('express');
const { check } = require('express-validator');
const {
  createTurismo,
  getTurismo,
  getTurismos,
  editTurismo,
  deleteTurismo,
} = require('../controllers/turismoController');
const { existeTurismoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const turismoRoutes = (app) => {
  const router = Router();

  app.use('/api/v1/turismo', router);

  router.get('/', getTurismos);

  router.post(
    '/',
    [
      validarJWT,
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('description', 'La descripción es obligatoria').not().isEmpty(),
      validarCampos,
    ],
    createTurismo
  );

  router.get(
    '/:id',
    [
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom(existeTurismoPorId),
      validarCampos,
    ],
    getTurismo
  );

  router.put(
    '/:id',
    [
      validarJWT,
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom(existeTurismoPorId),
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('description', 'La descripción es obligatoria').not().isEmpty(),
      validarCampos,
    ],
    editTurismo
  );

  router.delete(
    '/:id',
    [
      validarJWT,
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom(existeTurismoPorId),
      validarCampos,
    ],
    deleteTurismo
  );

  return router;
};

module.exports = { turismoRoutes };

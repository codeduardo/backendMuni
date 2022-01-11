const { Router } = require('express');
const { check } = require('express-validator');
const {
  getTiposDocs,
  createTiposDoc,
  deleteTiposDocs,
} = require('../controllers/tiposDocControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const tiposDocRoutes = (app) => {
  app.use('/api/v1/tiposDoc', router);

  router.get('/', getTiposDocs);

  router.post(
    '/',
    [
      validarJWT,
      check('name', 'El nombre del tipo de documento es obligatorio')
        .not()
        .isEmpty(),
      check(
        'description',
        'La descripcion del tipo de documento es obligatorio'
      )
        .not()
        .isEmpty(),
      validarCampos,
    ],
    createTiposDoc
  );
  router.delete('/:id', deleteTiposDocs);
  return router;
};

module.exports = { tiposDocRoutes };

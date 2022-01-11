const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearColaborador,
  getColaboradores,
  eliminarColaborador,
} = require('../controllers/colaboradoresController');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const colaboradoresRoutes = (app) => {
  app.use('/api/v1/colaborador', router);

  router.post(
    '/',
    [
      validarJWT,
      check('fullName', 'El nombre del colaborador es obligatorio')
        .not()
        .isEmpty(),
      check('rol', 'El rol del colaborador es obligatorio').not().isEmpty(),
      validarCampos,
    ],
    crearColaborador
  );
  router.get('/', getColaboradores);
  router.delete('/:id', eliminarColaborador);

  return router;
};

module.exports = { colaboradoresRoutes };

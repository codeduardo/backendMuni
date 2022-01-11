const { Router } = require('express');
const { check } = require('express-validator');
const { login, createUser } = require('../controllers/userControllers');
const { validarCampos } = require('../middlewares/validar-campos');

const userRoutes = (app) => {
  const router = Router();

  app.use('/api/v1/user', router);

  router.post(
    '/login',
    [
      check('email', 'El correo es obligatorio').isEmail(),
      check('password', 'La contraseña es obligatoria').not().isEmpty(),
      validarCampos,
    ],
    login
  );

  router.post(
    '/register',
    [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo es obligatorio').isEmail(),
      check(
        'password',
        'La contraseña debe contener almenos 6 caracteres'
      ).isLength({ min: 6 }),
      validarCampos,
    ],
    createUser
  );

  return router;
};

module.exports = { userRoutes };

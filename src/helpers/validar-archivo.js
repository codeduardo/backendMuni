const validarArchivo = (req, res, next) => {
  // console.log(
  //   Object.keys(req.files.archivo).includes('name')
  //     ? 'Un solo archivo'
  //     : 'Dos a mas'
  // );
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: 'No hay archivos que subir' });
    return;
  }
  next();
};

module.exports = { validarArchivo };

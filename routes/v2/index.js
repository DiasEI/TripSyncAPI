const router = require('express').Router();
const usersRouter = ('../../controllers/v1/user');
const fotosRouter = ('../../controllers/v1/foto');
const locaisRouter = ('../../controllers/v1/local');
const viagensRouter = ('../../controllers/v1/viagem');

router.use('/users', usersRouter);
router.use('/fotos', fotosRouter);
router.use('/locais', locaisRouter);
router.use('/viagens', viagensRouter);

module.exports = router;
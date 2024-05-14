const router = require('express').Router();
const usersRouter = require('./users');
const fotosRouter = require('./fotos');
const locaisRouter = require('./locais');
const viagensRouter = require('./viagens');

router.use('/users', usersRouter);
router.use('/fotos', fotosRouter);
router.use('/locais', locaisRouter);
router.use('/viagens', viagensRouter);

module.exports = router;
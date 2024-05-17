const router = require('express').Router();
const usersRouter = require('./users');
const fotosRouter = require('./fotos');
const locaisRouter = require('./locais');
const viagensRouter = require('./viagens');
const authRouter = require('./auth');

router.use('/users', usersRouter);
router.use('/fotos', fotosRouter);
router.use('/locais', locaisRouter);
router.use('/viagens', viagensRouter);
router.use('/auth', authRouter);

module.exports = router;








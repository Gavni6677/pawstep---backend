const express = require('express');
const router = express.Router();

const sitterRouter = require('./sitter_routes');
const petRouter = require('./pet_routes');
const reportRouter = require('./report_routes');
const authRouter = require('./auth_routes');

router.use('/sitter', sitterRouter);
router.use('/pets', petRouter);
router.use('/reports', reportRouter);
router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.send('Welcome to PawStep API');
});

module.exports = router;
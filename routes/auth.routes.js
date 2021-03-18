const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../services/logger')(module);

const router = Router();

router.get('/', (req, res) => {
  const { user } = req?.query;

  if (!user) {
    logger.error('No user passed');
    return res.status(400).json({
      error: 'No user passed',
    });
  }

  const token = jwt.sign(
    { user },
    config.app,
    {
      expiresIn: config.jwt_ttl,
    },
  );

  res.header('Authorization', `Bearer ${token}`);
  return res.status(200).end();
});

module.exports = router;

const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.middleware');
const contactsController = require('../controllers/contacts.controller');

router.get(
  '/:id',
  auth,
  contactsController.get,
);

router.patch(
  '/:id',
  auth,
  contactsController.update,
);

module.exports = router;

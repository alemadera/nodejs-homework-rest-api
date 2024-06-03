const express = require('express')
const { listContacts, getById, addContact, removeContact, updateContact } = require('../../controllers/contactsController');
const { validateContact, validateUpdateContact } = require('../../middlewares/validation');

const router = express.Router()

router.get('/', listContacts);

router.get('/:id', getById);

router.post('/', validateContact, addContact);

router.delete('/:id', removeContact);

router.put('/:id', validateUpdateContact, updateContact);

module.exports = router

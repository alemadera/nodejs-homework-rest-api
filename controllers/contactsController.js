const { readContacts, writeContacts } = require('../models/contactsModel');
const { v4: uuidv4 } = require('uuid');

const listContacts = async (req, res) => {
  try {
    const contacts = await readContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error reading contacts' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error reading contacts' });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contacts = await readContacts();
  const existingContact = contacts.find(contact => contact.name === name);
  if (existingContact) {
    return res.status(400).json({ message: 'Contact with this name already exists' });
  }
  const newContact = { id: uuidv4(), name, email, phone };
  try {
    const contacts = await readContacts();
    contacts.push(newContact);
    await writeContacts(contacts);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact' });
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await readContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    if (updatedContacts.length !== contacts.length) {
      await writeContacts(updatedContacts);
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing contact' });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      if (name) contacts[index].name = name;
      if (email) contacts[index].email = email;
      if (phone) contacts[index].phone = phone;
      await writeContacts(contacts);
      res.status(200).json(contacts[index]);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
};

module.exports = { 
  listContacts, 
  getById, 
  addContact, 
  removeContact, 
  updateContact 
};

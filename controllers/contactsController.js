const Contact = require('../models/contactsModel');

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error reading contacts' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
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
  try {
    const existingContact = await Contact.findOne({ name });
    if (existingContact) {
      return res.status(400).json({ message: 'Contact with this name already exists' });
    }
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact' });
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
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
    const updatedContact = await Contact.findByIdAndUpdate(
      id, 
      { name, email, phone }, 
      { new: true }
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { 
  listContacts, 
  getById, 
  addContact, 
  removeContact, 
  updateContact,
  updateStatusContact 
};

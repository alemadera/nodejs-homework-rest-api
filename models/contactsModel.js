const fs = require('fs').promises;
const path = require ('path');

const contactsPath = path.join(__dirname,'contacts.json');

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  readContacts,
  writeContacts,
}

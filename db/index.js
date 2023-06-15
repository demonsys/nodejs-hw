const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  } catch (error) {
    console.log(`Can't read file ${contactsPath} `, error);
  }
};

const getContactById = async contactId => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find(contact => contact.id === contactId);
    return contactById || null;
  } catch {
    console.log(`Can't get contact `);
  }
};

const removeContact = async contactId => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removedContact] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(`Can't remove contact `, error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: nanoid(), name, email, phone };
    const allContacts = await listContacts();
    allContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(`Can't add contact `, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

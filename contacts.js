const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const fetchContact = data.find((c) => c.id === contactId);
  if (!fetchContact) return null;
  return fetchContact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((c) => c.id === contactId);
  if (index === -1) return null;
  const [contactToRemove] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return contactToRemove;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
import fs from 'fs/promises' 
import { nanoid } from 'nanoid';
import path from 'path'

const contactsPath = path.resolve("db", "contacts.json");

function updateContacts (contacts) {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

async function listContacts () {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}
  
async function getContactById (contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
}
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if(index === -1) return null

    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts)
    return result
}
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
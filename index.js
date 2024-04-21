import contactsAPI from "./contacts.js";
import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await contactsAPI.listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await contactsAPI.getContactById(id);
        console.log(contactById);
        break;

      case "add":
        const newContact = await contactsAPI.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const contactToRemove = await contactsAPI.removeContact(id);
        console.log(contactToRemove);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
        break;
    }
  } catch (error) {
    console.log(error.message);
  }
}

invokeAction(options);

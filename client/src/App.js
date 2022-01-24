import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/App.css';
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import phonebookService from './services/phonebook'

 function App() {
    const [contacts, setContacts] = useState([]);
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const { handleSubmit } = useForm()

    useEffect(() => {
    phonebookService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
      .catch(error => {
        console.log(`Can't fetch contacts. ${error}`);
      });
   }, [])


  const addContact = (newContact) => {
    console.log('newContact',newContact)
    phonebookService.create(newContact)
      .then(response => {
      setContacts(contacts.concat(response))
      setNewName("");
      setNewSurname("");
      setNewEmail("");
      setNewPhone("");
      })
          .catch(error => {

        console.log(`Failed to add ${newContact.name}'s information on the server. ${error}`)

      })
  }

  const editContact= (id,changedContact)=>{
    phonebookService
    .update(id,changedContact)
    .then(returnedContact => {
      setContacts(contacts.map(contact => contact.id !== id ? contact : returnedContact));
      setNewName("");
      setNewSurname("");
      setNewEmail("");
      setNewPhone("");
    })
    .catch(error => {
        console.log(`Failed to update ${changedContact.name}'s information on the server. ${error}`)

      })
  }

  const checkUpdateExistingContact = (event) => {
    // event.preventDefault();
    const contactByName = contacts.find(p => p.name === newName);
    const contactByPhone = contacts.find(p => p.phone === newPhone);
    const targetContact = contactByName || contactByPhone;

    const newContact = {
      name:newName,
      surname: newSurname,
      email:newEmail,
      phone: newPhone
    }

    if (targetContact) {
      //edit contact
      console.log('edit')
      const id = targetContact.id;

      if (
        contactByName &&
        !window.confirm(
          `Name ${newName} is already in the phonebook.\nDo you want to update rest of the information of this contact?`
            )
        ) {
          return false;
        }

      if (
        contactByPhone &&
        !window.confirm(
          `Number ${newPhone} is already in the phonebook.\nDo you want to update rest of the information of this contact?`
        )
        ) {
          return false;
        }
        editContact(id, newContact)
    }
    else
    {
      //add contact 
      addContact(newContact);
    }
  };


  const handleDelete = id => {
    if (!window.confirm("Are you sure?")) return;
    let targetContact = contacts.find(p => p.id === id);
    phonebookService
      .remove(id)
      .then(() => {
        alert(`Removed ${targetContact.name} successfully`);
        setContacts(contacts.filter(p => p.id !== id));
      })
      .catch(error => {
          alert(
            `Failed to remove ${targetContact.name} from the server. ${error}`
          );
      });
  };


  const handleEdit = (id) => {
    let targetContact = contacts.find(p => p.id === id);
    setNewName(targetContact.name);
    setNewSurname(targetContact.surname);
    setNewEmail(targetContact.email);
    setNewPhone(targetContact.phone);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new contact or edit an existing one:</h3>
      <ContactForm 
        name={newName}
        surname={newSurname}
        email={newEmail}
        phone={newPhone}
        onNameChange={setNewName}
        onSurnameChange={setNewSurname}
        onEmailChange={setNewEmail}
        onPhoneChange={setNewPhone}
        onSubmit={handleSubmit(checkUpdateExistingContact)}
      />
      <h3>Numbers</h3>
       <Contacts list={contacts} onDelete={handleDelete} onEdit={handleEdit} /> 
    </div>
  );
 };

 export default App;

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dataFromServer from './data/contacts.json';
import Form from './components/Form';
import Section from './components/Section';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', dataFromServer);
  const [filter, setFilter] = useState('');

  const validateContact = (data, contacts) => {
    if (contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return false;
    } else return true;
  };

  const formSubmitHandler = data => {
    const isContactValid = validateContact(data, contacts);

    if (isContactValid) {
      data.id = uuidv4();
      setContacts(state => [data, ...state]);
    }
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const handleSearch = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltredContacts = contacts => {
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(person =>
      person.name.toLowerCase().includes(lowerCaseFilter),
    );
  };

  const filteredContacts = getFiltredContacts(contacts);

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={handleSearch} />
        <Contacts
          contacts={filteredContacts}
          onDeleteBtnClick={deleteContact}
        />
      </Section>
    </>
  );
}

export default App;

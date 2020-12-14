import React, { useState, useEffect } from 'react';
import dataFromServer from './data/contacts.json';
import Form from './components/Form';
import Section from './components/Section';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) || dataFromServer,
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));

    // при полной очистке контактов добавляю стандартный массив.
    // при необходимости можно удалить
    const localstorageArrayLength =
      JSON.parse(window.localStorage.getItem('contacts')).length === 0;
    if (localstorageArrayLength) {
      setContacts(dataFromServer);
    }
  }, [contacts]);

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

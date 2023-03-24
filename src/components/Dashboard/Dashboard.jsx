import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Modal from 'components/Modal/Modal';

import { Container, MainTitle, SubTitle } from './Dashboard.styled';
import { Button } from 'components/ContactListItem/ContactListItem.styled';

import { useLocalStorage } from 'hooks/useLocalStorage';
import defaultValue from 'data/defaultValue';

const Dashboard = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultValue);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const formSubmit = data => {
    const isMatch = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isMatch) {
      alert(`${data.name} is already in contacts list!`);
      return;
    }

    const contact = {
      id: nanoid(),
      ...data,
    };

    setContacts(state => [...state, contact]);

    toggleModal();
  };

  const filterChange = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const handleClick = data => {
    setContacts(state => state.filter(contact => contact.id !== data));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <Button type="button" onClick={toggleModal}>
        Add contact
      </Button>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={formSubmit} />
        </Modal>
      )}
      {/* <ContactForm onSubmit={this.formSubmit} /> */}

      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} onChange={filterChange} />

      {contacts.length === 0 ? (
        <p>Phonebook is empty</p>
      ) : filteredContacts.length === 0 ? (
        <p>Contact with name '{filter}' not found</p>
      ) : (
        <ContactList contacts={filteredContacts} onClick={handleClick} />
      )}
    </Container>
  );
};

export default Dashboard;

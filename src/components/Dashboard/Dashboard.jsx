import { useState } from 'react';

import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Modal from 'components/Modal/Modal';

import { Container, MainTitle, SubTitle } from './Dashboard.styled';
import { Button } from 'components/ContactListItem/ContactListItem.styled';

import { useLocalStorage } from 'hooks/useLocalStorage';
import defaultValue from 'data/defaultValue';

const Dashboard = () => {
  // const [contacts, setContacts] = useLocalStorage('contacts', defaultValue);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filterChange = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // const normalizedFilter = filter.toLowerCase();
  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(normalizedFilter)
  // );

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <Button type="button" onClick={toggleModal}>
        Add contact
      </Button>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm />
        </Modal>
      )}
      {/* <ContactForm onSubmit={this.formSubmit} /> */}

      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} onChange={filterChange} />

      {/* {contacts.length === 0 ? (
        <p>Phonebook is empty</p>
      ) : filteredContacts.length === 0 ? (
        <p>Contact with name '{filter}' not found</p>
      ) : ( */}
        <ContactList />
      {/* )} */}
    </Container>
  );
};

export default Dashboard;

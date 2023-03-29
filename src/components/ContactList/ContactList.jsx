import ContactListItem from 'components/ContactListItem/ContactListItem';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
const contacts = useSelector(getContacts);
  return  (<ul>
    {contacts.map(contact => {
      return (
        <ContactListItem
          key={contact.id}
          contact={contact}
        />
      );
    })}
  </ul>)
};

export default ContactList;

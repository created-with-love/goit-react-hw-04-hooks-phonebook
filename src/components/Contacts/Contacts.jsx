import React from 'react';
import s from './Contacts.module.css';
import PropTypes from 'prop-types';
import { FaTrash, FaAddressCard } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Contacts = ({ contacts, onDeleteBtnClick }) => (
  <div className={s.list}>
    <ul className={s.list__ul}>
      {contacts.map(person => (
        <li key={person.id} className={s.search__contact}>
          <IconContext.Provider
            value={{ color: 'black', size: '1.6em', className: 'react-icons' }}
          >
            <FaAddressCard onClick={() => onDeleteBtnClick(person.id)} />
          </IconContext.Provider>
          {person.name} : {person.number}
          <div className={s.trash}>
            <IconContext.Provider
              value={{
                color: 'red',
                size: '1.1em',
                className: 'react-icons',
              }}
            >
              <FaTrash onClick={() => onDeleteBtnClick(person.id)} />
            </IconContext.Provider>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteBtnClick: PropTypes.func.isRequired,
};

export default Contacts;

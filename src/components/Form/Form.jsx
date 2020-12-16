import { useState, useRef, memo } from 'react';
import s from './Form.module.css';
import { v4 as uuidv4 } from 'uuid';

function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = useRef(uuidv4());

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  // для получения данных из формы в App.js во время сабмита
  // использую метод с поднятием состояния в родитель
  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name: name, number: number });
    reset();
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor={nameId.current}>
          <p className={s.form__label}>Name</p>
          <input
            type="text"
            name="name"
            className={s.form__firstInput}
            value={name}
            onChange={handleInputChange}
            id={nameId.current}
            placeholder="Enter name"
            required
          />
        </label>
        <label>
          <p className={s.form__label}>Number</p>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            maxLength="9"
            minLength="7"
            pattern="[0-9]{3}-{0,1}[0-9]{2}-{0,1}[0-9]{2}"
            required
            placeholder="123-45-67"
          />
        </label>
        <div className={s.submit__box}>
          <button
            className={s.form__button}
            type="submit"
            disabled={name === '' || number === ''}
          >
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(Form);

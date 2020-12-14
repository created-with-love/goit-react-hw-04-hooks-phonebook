import { v4 as uuidv4 } from 'uuid';

const DataGenerator = data => {
  return data.map(contact => {
    contact.id = uuidv4();
    contact.number =
      Math.floor(Math.random() * (999 - 100) + 100) +
      '-' +
      Math.floor(Math.random() * (99 - 10) + 10) +
      '-' +
      Math.floor(Math.random() * (99 - 10) + 10);
    return contact;
  });
};

export default DataGenerator;

const config = require('../config');

module.exports = {
  get,
  update,
};

const contact = {
  id: config.contact_id,
  lastname: 'Григорьев',
  firstname: 'Сергей',
  patronymic: 'Петрович',
  phone: '79162165588',
  email: 'grigoriev@funeral.com',
  createdAt: '2020-11-21T08:03:26.589Z',
  updatedAt: '2020-11-23T09:30:00Z',
};

function get(req, res) {
  return res.status(200).json(contact);
}

function update(req, res) {
  const requestBody = req.body;

  const updatedContact = { ...contact };
  Object.keys(requestBody).forEach((key) => {
    updatedContact[key] = requestBody[key];
  });
  updatedContact.updatedAt = new Date();

  return res.status(200).json(updatedContact);
}

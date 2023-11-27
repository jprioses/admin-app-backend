const Credentials = require("../Models/Credentials");

const createCredentials = (data) => {
  return new Credentials(data).save();
};

const findCredentialsById = (id) => {
  return Credentials.findById(id);
};

const findCredentials = (params) => {
  return Credentials.find(params);
};

const updateCredentials = (id, params) => {
  return Credentials.findByIdAndUpdate(id, params, { new: true });
};

const deleteCredentials = (params) => {
  return Credentials.findOneAndDelete(params);
};

module.exports = {
  findCredentialsById,
  findCredentials,
  createCredentials,
  updateCredentials,
  deleteCredentials,
};

const Companies = require("../Models/Companies");

const createCompanies = (data, user) => {
    return new Companies(data).save();
};

const findCompaniesById = (id) => {
  return Companies.findById(id);
}

const findCompanies = (params) => {
  return Companies.find(params);
};

const updateCompanies = (id, params) => {
  return Companies.findByIdAndUpdate(id, params, {new: true})
}

const deleteCompanies = (params) => {
  return Companies.findOneAndDelete(params)
}

module.exports = {
  findCompaniesById,
  findCompanies,
  createCompanies,
  updateCompanies,
  deleteCompanies
};
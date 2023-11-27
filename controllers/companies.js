const CompaniesServices = require("../services/companies");
const catchedAsync = require("../utils/catchedAsync");
const { response } = require("../utils/response");
const ClientError = require("../utils/errors");


const createCompanies = async (req, res) => {
  const params = req.body;

  if (!params.name) throw new ClientError("Must type company name");

  const company = await CompaniesServices.createCompanies(params);

  response(res, 200, company);
};

const readCompanies = async (req, res) => {
  const params = req.body;
  const companies = await CompaniesServices.findCompanies(params);

  if (!companies) throw new ClientError("Error while searching companies");

  response(res, 200, companies);
};

const readCompaniesById = async (req, res) => {
  const id = req.params.id;

  const company = await CompaniesServices.findCompaniesById(id);

  if (!company) throw new ClientError("Error while searching company");

  response(res, 200, company);
};

const updateCompanies = async (req, res) => {
  const params = req.body;
  const id = req.params.id;

  if (Object.keys(params).length == 0)
    throw new ClientError("Must enter data to update");

  const company = await CompaniesServices.updateCompanies(id, params);

  if (!company) throw new ClientError("Company not found");

  response(res, 200, company);
};

const deleteCompanies = async (req, res) => {
  const id = req.params.id;

  const company= await CompaniesServices.deleteCompanies(id);

  if (!company) throw new ClientError("Company not found");

  response(res, 200, company);
};

module.exports = {
  createCompanies: catchedAsync(createCompanies),
  readCompaniesById: catchedAsync(readCompaniesById),
  readCompanies: catchedAsync(readCompanies),
  updateCompanies: catchedAsync(updateCompanies),
  deleteCompanies: catchedAsync(deleteCompanies)
};

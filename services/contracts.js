const Contracts = require("../Models/Contracts");

const createContracts = (data) => {
  return new Contracts(data).save();
};

const findContractsById = (id) => {
  return Contracts.findById(id).then((user) => user);
};

const findContracts = (params) => {
  return Contracts.find(params).then((user) => user);
};

const updateContracts = (id, data, upsert=false, getNew=false) => {
  return Contracts.findOneAndUpdate({ _id: id }, { $set: data }, {upsert , new: getNew });
};

const deleteContracts = (id) => {
  return Contracts.findByIdAndDelete(id);
};

const updateContractsByArray = (idArray, data,) => {
  return Contracts.updateMany({_id: {$in : idArray}}, {$set: data});
}

module.exports = {
  findContractsById,
  createContracts,
  findContracts,
  updateContracts,
  deleteContracts,
  updateContractsByArray
};

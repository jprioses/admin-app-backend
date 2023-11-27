const Buildings = require("../Models/Buildings");

const createBuildings = (data, user) => {
    return new Buildings(data).save();
};

const findBuildingsById = (id) => {
  return Buildings.findById(id);
}

const findBuildings = (params) => {
  return Buildings.find(params);
};

const updateBuildings = (id, params) => {
  return Buildings.findByIdAndUpdate(id, params, {new: true})
}

const deleteBuildings = (params) => {
  return Buildings.findOneAndDelete(params)
}

module.exports = {
  findBuildingsById,
  findBuildings,
  createBuildings,
  updateBuildings,
  deleteBuildings
};
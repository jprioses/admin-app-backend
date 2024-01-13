const BuildingsServices = require("../services/buildings");
const catchedAsync = require("../utils/catchedAsync");
const { response } = require("../utils/response");
const ClientError = require("../utils/errors");
const validate = require('../utils/validate')

const createBuildings = async (req, res) => {
  const params = req.body;

  let checkData = validate.validateBuildingsData(params);

  if (!checkData) throw new ClientError("Missing some data");

  const building = await BuildingsServices.createBuildings(params);

  response(res, 200, building);
};

const readBuildings = async (req, res) => {
  const params = req.body;
  const buildings = await BuildingsServices.findBuildings(params);

  if (!buildings) throw new ClientError("Building not found");

  response(res, 200, buildings);
};

const readBuildingsById = async (req, res) => {
  const id = req.params.id;

  const building = await BuildingsServices.findBuildingsById(id);

  if (!building) throw new ClientError("Building not found");

  response(res, 200, building);
};

const updateBuildings = async (req, res) => {
  const params = req.body;
  const id = req.params.id;

  if (Object.keys(params).length == 0)
    throw new ClientError("Must enter data to update");

  let checkData = validate.validateBuildingsData(params);

  if (!checkData) throw new ClientError("Missing some data");

  const building = await BuildingsServices.updateBuildings(id, params);

  if (!building) throw new ClientError("Building not found");

  response(res, 200, building);
};

const deleteBuildings = async (req, res) => {
  const id = req.params.id;

  const building = await BuildingsServices.deleteBuildings(id);

  if (!building) throw new ClientError("Building not found");

  response(res, 200, building);
};

module.exports = {
  createBuildings: catchedAsync(createBuildings),
  readBuildingsById: catchedAsync(readBuildingsById),
  readBuildings: catchedAsync(readBuildings),
  updateBuildings: catchedAsync(updateBuildings),
  deleteBuildings: catchedAsync(deleteBuildings),
};

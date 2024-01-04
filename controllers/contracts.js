const validate = require("../utils/validate");
const ContractsServices = require("../services/contracts");
const { response } = require("../utils/response");
const ClientError = require("../utils/errors");

const fs = require("fs");
const path = require("path");
const catchedAsync = require("../utils/catchedAsync");

const createContracts = async (req, res) => {
  const params = req.body;

  params.ref_users = req.params.ref_users;
  params.ref_buildings = req.params.ref_buildings;

  let checkData = validate.validateNewContractsData(params);

  if (!checkData) throw new ClientError("Missing some data");

  const contract = await ContractsServices.createContracts(params);

  response(res, 200, contract);
};

const readContracts = async (req, res) => {
  const params = {}
  req.params.ref_buildings && (params.ref_buildings = req.params.ref_buildings);
  req.params.ref_users && (params.ref_users = req.params.ref_users);
  req.params.ref_companies && (params.ref_companies = req.params.ref_companies);
  
  const contracts = await ContractsServices.findContracts(params);

  if (!contracts) throw new ClientError("Error while searching contracts");

  response(res, 200, contracts);
};

const readContractsById = async (req, res) => {
  const id = req.params.id;

  const contract = await ContractsServices.findContractsById(id);

  if (!contract) throw new ClientError("Error while searching contract");

  response(res, 200, contract);
};

const updateContracts = async (req, res) => {
  const params = req.body;
  const id = req.params.id;

  if (Object.keys(params).length == 0)
    throw new ClientError("Must enter data to update");

  const contract = await ContractsServices.updateContracts(id, params);

  if (!contract) throw new ClientError("Contract not found");

  response(res, 200, contract);
};

const deleteContracts = async (req, res) => {
  const id = req.params.id;

  const contract = await ContractsServices.deleteContracts(id);

  if (!contract) throw new ClientError("Contract not found");

  response(res, 200, contract);
};

//TODO
const uploadContractsFile = async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;

  if (!req.file) throw new ClientError("Must give a file");
  if (!req.params.type) throw new ClientError("Must give a type");

  const model = req.file.originalname;

  const modelSplit = model.split(".");
  const ext = modelSplit[1];

  if (
    type == "contract_model" ||
    type == "contract" 
  ) {
    if (ext != "PDF") {
      const filePath = req.file.path;
      //Si la extensión no cumple puedo usar el unlink, de la libreria fs para eliminarlo,
      //unlinkSycn es sincrono, no hay que esperar el callback
      fs.unlinkSync(filePath);

      throw new ClientError("Must give a valid format");
    }
  } else {
    if (ext != "png" && ext != "jpg" && ext != "jpeg" && ext != "gif") {
      const filePath = req.file.path;
      //Si la extensión no cumple puedo usar el unlink, de la libreria fs para eliminarlo,
      //unlinkSycn es sincrono, no hay que esperar el callback
      fs.unlinkSync(filePath);

      throw new ClientError("Must give a valid image format");
    }
  }

  const contract = await ContractsServices.updateContracts(
    id,
    type == 'contract_model' && { contract_model: req.file.filename },
    type == 'signature' && { signature: req.file.filename },
    type == 'fingerprint' && { fingerprint: req.file.filename },
    type == 'contract' && { contract: req.file.filename },
    false,
    true
  );

  if (!contract || Object.keys(contract).length == 0) {
    const filePath = req.file.path;
    //Si la extensión no cumple puedo usar el unlink, de la libreria fs para eliminarlo,
    //unlinkSycn es sincrono, no hay que esperar el callback
    fs.unlinkSync(filePath);

    throw new ClientError("Contract not found");
  }
  response(res, 200, contract);
};

const getContractsFile = async (req, res) => {
  const file = req.params.file;
  const type = req.params.type;
  const filePath = "./uploads/" + type + "/" + file;

  //Comprobar si existe
  fs.stat(filePath, (error, exist) => {
    if (!exist) new ClientError("Document not found");
    return res.sendFile(path.resolve(filePath));

    //Sendfile es un metodo que devuelve un archivo, debo poner rutas absolutas con la libreria path y el metodo resolve
  });
};


module.exports = {
  createContracts: catchedAsync(createContracts),
  readContractsById: catchedAsync(readContractsById),
  readContracts: catchedAsync(readContracts),
  updateContracts: catchedAsync(updateContracts),
  deleteContracts: catchedAsync(deleteContracts),
  uploadContractsFile: catchedAsync(uploadContractsFile),
  getContractsFile: catchedAsync(getContractsFile),
};

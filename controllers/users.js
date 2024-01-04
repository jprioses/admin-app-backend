const validate = require("../utils/validate");
const UsersServices = require("../services/users");
const CredentialsServices = require("../services/credentials");
const catchedAsync = require("../utils/catchedAsync");
const { response } = require("../utils/response");
const ClientError = require("../utils/errors");

const fs = require("fs");
const path = require("path");

const testUsers = (req, res) => {
  return res.status(200).send({
    mensaje: "Sent from ./controllers/userData,js",
  });
};

const createUsers = async (req, res) => {
  const params = req.body;

  params.ref_buildings = req.params.ref_buildings;

  let checkData = validate.validateNewUserData(params);

  if (!checkData) throw new ClientError("Missing some data");

  if (params.national_id) {
    const user = await UsersServices.findUsers({
      national_id: params.national_id,
    });
    if (user.length > 0) throw new ClientError("User already exist");
  }

  const user = await UsersServices.createUsers(params);

  response(res, 200, user);
};

const readUsers = async (req, res) => {
  const params = {}
  params.type = req.params.type;
  req.params.ref_buildings && (params.ref_buildings = req.params.ref_buildings);
  req.params.ref__companies && (params.ref_companies = req.params.ref__companies)

  const users = await UsersServices.findUsers(params);

  if (!users) throw new ClientError("Error while searching users");

  response(res, 200, users);
};

const readUsersById = async (req, res) => {
  const id = req.params.id;

  const user = await UsersServices.findUsersById(id);

  if (!user) throw new ClientError("Error while searching user");

  response(res, 200, user);
};

const updateUsersById = async (req, res) => {
  const params = req.body;
  const id = req.params.id;

  if (Object.keys(params).length == 0)
    throw new ClientError("Must enter data to update");

  const user = await UsersServices.updateUsers(id, params);

  if (!user) throw new ClientError("User not found");

  response(res, 200, user);
};

const updateUsersByArray = async (req, res) => {
  const idArray = JSON.parse(req.body.arr);

  const ref_buildings = req.params.ref_buildings;

  const user = await UsersServices.updateUsersByArray(idArray, {
    ref_buildings,
  });

  if (!user) throw new ClientError("User not found");

  response(res, 200, user);
};

const deleteUsersById = async (req, res) => {
  const id = req.params.id;

  const user = await UsersServices.deleteUsers(id);

  if (!user) throw new ClientError("User not found");

  if (user.photo && user.photo != "default.png") {
    const file = user.photo;
    const filePath = "./uploads/avatars/" + file;

    fs.stat(filePath, (error, exist) => {
      if (exist) fs.unlinkSync(filePath);
    });
  }

  //Find and delete credentials
  const credentials = await CredentialsServices.deleteCredentials({
    ref_users: id,
  });

  response(res, 200, user);
};

const uploadUsersFile = async (req, res) => {
  const type = req.params.type;
  if (!req.file) throw new ClientError("Must give a file");

  const image = req.file.originalname;

  const imgSplit = image.split(".");
  const ext = imgSplit[1];

  if (type=='avatar') {
    if (ext != "png" && ext != "jpg" && ext != "jpeg" && ext != "gif") {
      const filePath = req.file.path;
      //Si la extensión no cumple puedo usar el unlink, de la libreria fs para eliminarlo,
      //unlinkSycn es sincrono, no hay que esperar el callback
      fs.unlinkSync(filePath);
  
      throw new ClientError("Must give a valid file format");
    }
  }else {
    if (ext != "pdf") {
      const filePath = req.file.path;
      //Si la extensión no cumple puedo usar el unlink, de la libreria fs para eliminarlo,
      //unlinkSycn es sincrono, no hay que esperar el callback
      fs.unlinkSync(filePath);
  
      throw new ClientError("Must give a valid file format");
    }
  }

  
  const user = await UsersServices.updateUsers(
    req.params.id,
    type=='avatar' && { avatar: req.file.filename },
    type=='national_id' && {docs: {...user.docs, natioanl_id: req.file.filename}},
    type=='bank_statement' && {docs: {...user.docs, bank_statement: req.file.filename}},
    type=='rut' && {docs: {...user.docs, rut: req.file.filename}},
    type=='camara_comercio' && {docs: {...user.docs, camara_comercio: req.file.filename}},
    false,
    true
  );

  if (!user || Object.keys(user).length == 0) {
    const filePath = req.file.path;
    //Si la extensión no cumple puedo usar el unlink, de la libreria fs para eliminarlo,
    //unlinkSycn es sincrono, no hay que esperar el callback
    fs.unlinkSync(filePath);

    throw new ClientError("User not found");
  }
  response(res, 200, user);
};

const getUsersFile = async (req, res) => {
  const file = req.params.file;
  const type = req.params.type;
  let filePath;

  if (type=='avatar') filePath = "./uploads/avatar/" + file;
  else filePath = "./uploads/documents/" + file;

  //Comprobar si existe
  fs.stat(filePath, (error, exist) => {
    if (!exist) new ClientError("File not found");
    return res.sendFile(path.resolve(filePath));

    //Sendfile es un metodo que devuelve un archivo, debo poner rutas absolutas con la libreria path y el metodo resolve
  });
};

module.exports = {
  testUsers,
  createUsers: catchedAsync(createUsers),
  readUsers: catchedAsync(readUsers),
  readUsersById: catchedAsync(readUsersById),
  updateUsersById: catchedAsync(updateUsersById),
  updateUsersByArray: catchedAsync(updateUsersByArray),
  deleteUsersById: catchedAsync(deleteUsersById),
  uploadUsersFile: catchedAsync(uploadUsersFile),
  getUsersFile: catchedAsync(getUsersFile),
};

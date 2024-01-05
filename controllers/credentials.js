const JwtService = require("../services/jwt");
const CredentialsServices = require("../services/credentials");
const UsersServices = require("../services/users");
const EncryptServices = require("../services/encrypt");
//const NotificationsServices = require("../services/notifications");
const catchedAsync = require("../utils/catchedAsync");
const { response } = require("../utils/response");
const ClientError = require("../utils/errors");

//test controller
const testCredentials = (req, res) => {
  conosole.log("Here route");
  response(res, 200, { user: "Juan Pablo Rios" });
};

//Create user
const createCredentials = async (req, res) => {
  
  const params = req.body;
  const userId = req.params.user_id;

  if (!params.username || !params.password || !params.role)
    throw new ClientError("Username, password and role are mandatory");

  const credentialsQuery = await CredentialsServices.findCredentials({
    username: params.username.toLowerCase(),
  });

  if (credentialsQuery && credentialsQuery.length >= 1)
    throw new ClientError("Username already taken");

  const userQuery = await CredentialsServices.findCredentials({
    ref_users: userId,
  });

  if (userQuery && userQuery.length >= 1)
    throw new ClientError("User already has credentials");

  const user = await UsersServices.findUsersById(userId);

  if (!user) throw new ClientError("Must give valid user id");

  const pwd = await EncryptServices.encryptPassword(params.password);

  params.password = pwd;
  params.ref_users = userId;

  const credentials = await CredentialsServices.createCredentials(params);

  response(res, 200, {
    _id: credentials._id,
    username: credentials.username,
    ref_users: credentials.ref_users,
    role: credentials.role,
    type: credentials.type,
    permissions: credentials.permissions
  });
};

const readUserCredentials = async (req, res) => {
  const data = req.user
  if (Object.keys(data).length == 0) throw new ClientError("Not user");
  
  const id = data._id
  const credentials = await CredentialsServices.findCredentialsById(id)
  
  if (!credentials) throw new ClientError("Incorret user");
  
  response(res, 200, {
    _id: credentials._id,
    username: credentials.username,
    ref_users: credentials.ref_users,
    role: credentials.role,
    type: credentials.type,
    permissions: credentials.permissions
  })
}

const readCredentials = async (req, res) => {
  const userId = req.params.user_id;
  //Get user credentials
  const credentials = await CredentialsServices.findCredentials({
    ref_users: userId,
  });
  
  if (!credentials) throw new ClientError("Incorret user");

  if (credentials.length > 0) {
    response(res, 200, {
      _id: credentials[0]._id,
      username: credentials[0].username,
      ref_users: credentials[0].ref_users,
      role: credentials[0].role,
      type: credentials[0].type,
      permissions: credentials[0].permissions
    });
  } else {
    response(res, 200, {});
  }
};

const readAllCredentials = async (req, res) => {
  const params = {}
  //Get user credentials
  const credentials = await CredentialsServices.findCredentials(params);
  
  if (!credentials) throw new ClientError("Incorret user");

  if (credentials.length > 0) {
    response(res, 200, credentials)
  } else {
    response(res, 200, {});
  }
};

const login = async (req, res) => {
  const params = req.body;

  if (!params.username || !params.password)
    throw new ClientError("Must type username and password");

  const credentials = await CredentialsServices.findCredentials({
    username: params.username.toLowerCase(),
  });

  if (!credentials || credentials.length == 0)
    throw new ClientError("Incorrect username or password");

  const pwd = EncryptServices.decryptPassword(
    params.password,
    credentials[0].password
  );

  if (!pwd) throw new ClientError("Incorret password");

  const token = JwtService.createToken(credentials[0]);
  response(res, 200, {
    _id: credentials._id,
    username: credentials.username,
    ref_users: credentials.ref_users,
    role: credentials.role,
    type: credentials.type,
    permissions: credentials.permissions,
    token,
  });
};

const updateCredentials = async (req, res) => {
  const userId = req.params.user_id;
  const bodyParams = req.body;
  const params = {};

  //Get user credentials
  const credentials = await CredentialsServices.findCredentials({
    ref_users: userId,
  });

  if (!credentials) throw new ClientError("Incorret user");

  if (bodyParams.username && bodyParams.username.length > 0)
    params.username = bodyParams.username;
  if (bodyParams.password) {
    //get and decrypt old password

    if (!bodyParams.newPassword || bodyParams.newPassword.length == 0)
      throw new ClientError("Must provide a new password");

    const oldPwd = EncryptServices.decryptPassword(
      bodyParams.password,
      credentials[0].password
    );

    if (!oldPwd) throw new ClientError("Incorret password");

    //encrypt new password
    const pwd = await EncryptServices.encryptPassword(bodyParams.newPassword);

    params.password = pwd;
  }

  //update credentials qith new password and username

  if (Object.keys(params).length > 0) {
    const newCredentials = await CredentialsServices.updateCredentials(
      credentials[0]._id,
      params
    );

    if (!newCredentials) throw new ClientError("Couldn´t update credentials");

    response(res, 200, {
      _id: newCredentials._id,
      username: newCredentials.username,
      ref_users: newCredentials.ref_users,
      role: newCredentials.role,
      type: newCredentials.type,
      permissions: newCredentials.permissions
    });
  } else {
    throw new ClientError("Couldn't update credentials");
  }
};

const deleteCredentials = async (req,res) => {
  const userId = req.params.user_id;

  const credentials = await CredentialsServices.deleteCredentials({ref_users: userId,})

  if (!credentials) throw new ClientError('Couldnt delete credentials');

  response(res, 200, {
    _id: credentials._id,
    username: credentials.username,
    ref_users: credentials.ref_users,
    role: credentials.role,
    type: credentials.type,
    permissions: credentials.permissions
  })
}

module.exports = {
  testCredentials,
  createCredentials: catchedAsync(createCredentials),
  readUserCredentials: catchedAsync(readUserCredentials),
  readCredentials: catchedAsync(readCredentials),
  readAllCredentials: catchedAsync(readAllCredentials),
  login: catchedAsync(login),
  updateCredentials: catchedAsync(updateCredentials),
  deleteCredentials: catchedAsync(deleteCredentials)
};

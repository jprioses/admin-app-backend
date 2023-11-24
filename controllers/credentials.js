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

  const credentials = await CredentialsServices.saveCredentials(params);

  // await NotificationsServices.createNotifications(
  //   req.user.ref_users,
  //   userId,
  //   "credentials created"
  // );

  response(res, 200, {
    _id: credentials._id,
    username: credentials.username,
    ref_users: credentials.ref_users,
  });
};

module.exports = {
  testCredentials,
  createCredentials: catchedAsync(createCredentials),
};

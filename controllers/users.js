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
  params.ref_building = req.params.ref_building;

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

const readUsers = async (res, req) => {
  
}

module.exports = {
  testUsers,
  createUsers: catchedAsync(createUsers),
};

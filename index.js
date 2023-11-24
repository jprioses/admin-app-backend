const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

const { errorResponse } = require("./utils/response");

const CredentialsRoutes = require("./routes/credentials");
const UsersRoutes = require('./routes/users');

const path = require("path");
const { error } = require("console");

console.log("Welcome to API Rest Permberty adminApp");

connection();

const app = express();
const port = 3900;

app.use(cors());

//Parse body data from content-typ: application/json to json
app.use(express.json());
// Parse body data from form-url-encode data to json
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("client", { redirect: false }));


app.use("/api/credentials", CredentialsRoutes);
app.use("/api/users", UsersRoutes);

//Redirect all routes differents to above ones
app.get("*", function (req, res, next) {
   return res.sendFile(path.resolve("client/index.html"));
});

//This middleware with error as parameter is the error handler function wich express is going to use
app.use((err, req, res, next) => {
  if (err.name == "CastError") {
    err.message = "Couldn't find document";
    err.statusCode = 500;
  }
  if (!err.statusCode) err.message = "Error while connecting to database";
  errorResponse(res, err.statusCode || 500, err.message);
});

//Get server to listen
app.listen(port, () => {
  console.log("Server listening in port " + port);
});

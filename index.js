const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

const { errorResponse } = require("./utils/response");

const { AttendanceRoutes } = require("./routes/attendance");
const { BuildingsRoutes } = require("./routes/buildings");
const { CompaniesRoutes } = require("./routes/companies");
const { ContractsRoutes } = require("./routes/contracts");
const { CredentialsRoutes } = require("./routes/credentials");
const { DocumentsRoutes } = require("./routes/documents");
const { NotificationsRoutes } = require("./routes/notifications");
const { PaymentsRoutes } = require("./routes/payments");
const { UsersRoutes } = require("./routes/users");

const path = require("path");

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

app.use("/api/attendance", AttendanceRoutes);
app.use("/api/buildings", BuildingsRoutes);
app.use("/api/companies", CompaniesRoutes);
app.use("/api/contracts", ContractsRoutes);
app.use("/api/credentials", CredentialsRoutes);
app.use("/api/documents", DocumentsRoutes);
app.use("/api/notifications", NotificationsRoutes);
app.use("/api/payments", PaymentsRoutes);
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

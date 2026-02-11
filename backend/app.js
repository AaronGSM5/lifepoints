const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const v1Router = require("./routes/v1.router")


module.exports = async () => {
  const app = express();

  // app.set("trust proxy", 1);

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json({ limit: "12mb", extended: true }));
  app.use(express.urlencoded({ limit: "12mb", extended: true }));

  try {
    app.use("/api/v1/", v1Router)

  } catch (error) {
    console.log(error)
  }

  return app;
};

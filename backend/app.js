const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const v1Router = require("./routes/v1.router");

const PORT = process.env.PORT || 3000;

(async () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());
  app.use(express.json({ limit: "12mb" }));
  app.use(express.urlencoded({ limit: "12mb", extended: true }));

  try {
    app.use("/api/v1", v1Router);
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();

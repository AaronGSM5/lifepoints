import express from "express"
import cors from "cors"
import helmet from "helmet"

import v1Router from './routers/v1.router.js'

const PORT = process.env.PORT || 3000;

(async () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: true }));
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

import express from "express"
import cors from "cors"
import helmet from "helmet"
// import mongoose from "mongoose"

import v1Router from './routers/v1.router.js'

const PORT = process.env.PORT || 3000;

(async () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: true }));
  app.use(cors());
  app.use(express.json({ limit: "12mb" }));
  app.use(express.urlencoded({ limit: "12mb", extended: true }));

  try {
    // await mongoose.connect("mongodb://localhost:27030/lifepoints");
    // console.log("✅ Connected to MongoDB");

    app.use("/api/v1", v1Router);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();

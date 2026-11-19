import { User } from "@/models/user.model";
import { checkParameters } from "@/services/utils";
import { Client, Account } from "node-appwrite";
import { Request, Response, NextFunction } from "express";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const jwt = authHeader.split(" ")[1];

    const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
    const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;

    if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
      throw new Error("Missing required Appwrite environment variables");
    }

    checkParameters({ APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID });

    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      .setJWT(jwt);

    const account = new Account(client);

    // Appwrite will throw an error automatically if the JWT is invalid or expired
    const appwriteUser = await account.get();

    const mongoUser = await User.findOne({ external_id: appwriteUser.$id }).lean();

    if (!mongoUser) {
      return res.status(401).json({ error: "Unauthorized: User profile not found in database" });
    }

    // @ts-ignore
    req.appwriteClient = client;
    // @ts-ignore
    req.user = { mongoId: mongoUser._id, ...appwriteUser };

    next();
  } catch (error: any) {
    console.error("Authentication middleware error:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
}

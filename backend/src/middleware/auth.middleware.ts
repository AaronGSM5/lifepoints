import { Activity } from "@/models/activity.model";
import { User } from "@/models/user.model";
import { checkParameters } from "@/services/utils";
import { Client, Account } from "node-appwrite";

export async function authMiddleware(req, res, next) {
  try {
    // 1. Extract the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const jwt = authHeader.split(" ")[1];

    console.log({ authHeader });

    const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
    const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;

    checkParameters({ APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID });

    // 2. Initialize a fresh, isolated Appwrite Client for this request
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setJWT(jwt);

    const account = new Account(client);

    // 3. Validate the token by fetching the user account
    // Appwrite will throw an error automatically if the JWT is invalid or expired
    const appwriteUser = await account.get();

    const mongoUser = await User.findOne({ external_id: appwriteUser.$id }).lean();

    checkParameters({ mongoUser });

    const userWithId = { mongoId: mongoUser?._id, ...appwriteUser };

    // 4. Attach the user data and the configured client to the request object
    req.user = userWithId;
    req.appwriteClient = client;

    next();
  } catch (error: any) {
    console.error("Authentication middleware error:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
}

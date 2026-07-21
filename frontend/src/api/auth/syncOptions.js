import { apiRequest } from "../client/api";
import { account } from "../client/appwrite";

export const authKeys = {
  all: ["auth"],
  sync: () => [...authKeys.all, "sync"]
};

export const syncOptions = {
  syncUserMutation: () => ({
    mutationKey: authKeys.sync(),
    mutationFn: async () => {
      // 1. Get fresh JWT from Appwrite session
      const { jwt } = await account.createJWT();

      // 2. Send token to your backend via apiRequest
      const data = await apiRequest("/user/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      return data.user;
    }
  })
};

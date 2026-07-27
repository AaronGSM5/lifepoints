import mockUsers from "../lib/data/users.js";

const getAllUsers = async () => {
  return mockUsers;
};

const getUserInfo = async () => {
  return mockUsers[0];
};

const getUsersInfo = async (userId) => {
  return mockUsers.filter((user) => user._id);
};

import { User } from "../models/user.model.js";

const syncAppwriteUserToDB = async (appwriteUser: any) => {
  const { $id, email, name } = appwriteUser;

  const user = await User.findOneAndUpdate(
    { external_id: $id },
    {
      $setOnInsert: {
        external_id: $id,
        email: email,
        name: name, // can be changed
        username: name
      }
    },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      returnDocument: "after"
    }
  );

  return user;
};

export default { getAllUsers, getUserInfo, getUsersInfo, syncAppwriteUserToDB };

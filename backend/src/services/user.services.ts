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
  const { email, name } = appwriteUser;

  const baseUsername = email.split("@")[0];
  const defaultUsername = `${baseUsername}_${Math.floor(Math.random() * 10000)}`;

  const user = await User.findOneAndUpdate(
    { email: email },
    {
      $setOnInsert: {
        email: email,
        name: name || "New LifePoints User",
        username: defaultUsername
      }
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  );

  return user;
};

export default { getAllUsers, getUserInfo, getUsersInfo, syncAppwriteUserToDB };

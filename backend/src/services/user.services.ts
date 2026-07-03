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

export default { getAllUsers, getUserInfo, getUsersInfo };

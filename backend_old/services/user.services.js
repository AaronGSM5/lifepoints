import mockUsers from "../lib/data/users.js"

const getAllUsers = async () => {
  return mockUsers
}

const getUserInfo = async () => {
  return mockUsers[0]
}

export default { getAllUsers, getUserInfo }
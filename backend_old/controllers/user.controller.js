import UserServices from "../services/user.services.js"

const getAllUsers = async (req, res) => {
  const data = await UserServices.getAllUsers()

  res.status(200).json(data)
}


const getUserInfo = async (req, res) => {
  const data = await UserServices.getUserInfo()

  res.status(200).json(data)
}

export default { getUserInfo, getAllUsers }
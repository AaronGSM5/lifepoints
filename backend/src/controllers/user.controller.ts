import UserServices from "../services/user.services.js";
import { Request, Response, NextFunction } from "express";

const getAllUsers = async (req, res) => {
  const data = await UserServices.getAllUsers();

  res.status(200).json(data);
};

const getUserInfo = async (req, res) => {
  const data = await UserServices.getUserInfo();

  res.status(200).json(data);
};

const syncUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.user is guaranteed to exist here because of our middleware
    const appwriteUser = req.user;

    // Delegate database sync to the service
    const dbUser = await UserServices.syncAppwriteUserToDB(appwriteUser);

    res.status(200).json({
      message: "User synced successfully",
      user: dbUser
    });
  } catch (error: any) {
    next(error);
  }
};

export default { getUserInfo, getAllUsers, syncUser };

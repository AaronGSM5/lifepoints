import NotificationServices from "@/services/notification.services.js";

const getNotifications = async (req, res) => {
  const data = await NotificationServices.getNotifications();

  res.status(200).json(data);
};

export default { getNotifications };

import EventServices from "@/services/event.services.js";

const getBootstrap = (req, res) => {
  const data = EventServices.getBootstrap();

  res.status(200).json(data);
};

export default { getBootstrap };

import PageServices from "../services/page.services.js";

const getHomePage = async (req, res) => {
  const data = await PageServices.getHomePage();

  res.status(200).json(data);
};

const getTaskPage = async (req, res) => {
  const data = {
    recommended: [],
    activeTasks: [
      {
        img: "",
        name: "",
        lifepoints: 1000
      }
    ]
  };

  res.status(200).json(data);
};

export default { getHomePage, getTaskPage };

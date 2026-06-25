import PageServices from "../services/page.services.js";
import CommunityService from "../services/community.services.js";

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

const getProfilePage = async (req, res) => {
  const data = await PageServices.getProfilePage();

  res.status(200).json(data);
};

const getCommunitiesPage = async (req, res) => {
  try {
    const data = await CommunityService.getCommunities(req.query);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to render layout" });
  }
};

export default { getHomePage, getTaskPage, getProfilePage, getCommunitiesPage };

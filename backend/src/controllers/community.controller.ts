import CommunityServices from "@/services/community.services.js";

const getPaginatedCommunityRails = async (req, res) => {
  try {
    const data = await CommunityServices.getPaginatedCommunityRails(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to render layout" });
  }
};

const getCommunityCategories = async (req, res) => {
  try {
    const data = await CommunityServices.getCommunityCategories();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to render layout" });
  }
};

const getOneCommunity = async (req, res) => {
  try {
    const {id} = req.params
    const data = await CommunityServices.getOneCommunity(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to render layout" });
  }
};


export default { getPaginatedCommunityRails, getCommunityCategories, getOneCommunity };

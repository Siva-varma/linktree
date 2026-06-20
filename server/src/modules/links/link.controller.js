import { createLinkService } from "./link.service.js";

export const createLink = async (req, res) => {
  let { title, url } = req.body;
  let userId = req.user.id;
  let linkData = { title, url, userId };

  let newLink  = await createLinkService(linkData);


    res.status(201).json({
        success: true,
        message: "Link created successfully",
        newLink
    })
};

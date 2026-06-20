import * as LinkService from "./link.service.js";

export const createLink = async (req, res) => {
  let { title, url } = req.body;
  let userId = req.user.id;
  let linkData = { title, url, userId };

  let newLink = await LinkService.createLink(linkData);

  res.status(201).json({
    success: true,
    message: "Link created successfully",
    newLink,
  });
};

export const getAllLinks = async (req, res) => {
  let user = req.params.username;
  console.log(user);

  let links = await LinkService.getAllLinks(user);

  res.status(200).json({
    success: true,
    message: "Links fetched successfully",
    links,
  });
};

export const editLink = async (req, res) => {
  let linkId = req.params.id;
  let { title, url } = req.body;
  let userId = req.user.id;

  let { existingLink } = await LinkService.editLink(linkId, { title, url }, userId);

    res.status(200).json({
        success: true,
        message: "Link updated successfully",
        existingLink,
    })
};

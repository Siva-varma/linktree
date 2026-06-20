import linkModel from "../../models/link.model.js";
import userModel from "../../models/user.model.js";
import apiError from "../../utils/apiError.js";

export const createLink = async (linkData) => {
  //check all required fields are present
  if (!linkData.title || !linkData.url || !linkData.userId) {
    throw new apiError(400, "All fields are required");
  }

  //check if link already exists for the user
  const existingLink = await linkModel.findOne({
    url: linkData.url,
    user: linkData.userId,
  });

  if (existingLink) {
    throw new apiError(400, "Link already exists for the user");
  }

  //create new link
  const newLink = await linkModel.create({
    title: linkData.title,
    url: linkData.url,
    user: linkData.userId,
  });

  return newLink;
};

export const getAllLinks = async (user) => {
  const userData = await userModel.findOne({ username: user });

  if (!userData) {
    throw new apiError(404, "User not found");
  }

  const links = await linkModel.find({ user: userData._id });

  return links;
};

export const editLink = async (linkId, linkData, userId) => {
  //check if link exists
  const existingLink = await linkModel.findOne({ _id: linkId, user: userId });

  if (!existingLink) {
    throw new apiError(404, "Link not found");
  }

  //check if link already exists for the user
  const duplicateLink = await linkModel.findOne({
    url: linkData.url,
    user: userId,
  });

  if (duplicateLink) {
    throw new apiError(400, "Link already exists for the user");
  }

  //update link
  existingLink.title = linkData.title || existingLink.title;
  existingLink.url = linkData.url || existingLink.url;

  await existingLink.save();

  return existingLink;
};

export const deleteLink = async (linkId, userId) => {
  //check if link exists
  const existingLink = await linkModel.findOne({ _id: linkId, user: userId });

  if (!existingLink) {
    throw new apiError(404, "Link not found");
  }

  //delete link
  await existingLink.deleteOne();

  return existingLink;
};

export const incrementLinkClicks = async (linkId) => {
  //check if link exists
  const existingLink = await linkModel.findOne({ _id: linkId });

  if (!existingLink) {
    throw new apiError(404, "Link not found");
  }

  //increment link clicks
  existingLink.noOfClicks = (existingLink.noOfClicks || 0) + 1;

  await existingLink.save();

  return existingLink;
};

export const getLinkAnalysis = async (userId) => {
  //fetch links for the user
  const links = await linkModel.find({ user: userId });

  if (!links || links.length === 0) {
    return {
      totalLinks: 0,
      totalClicks: 0,
      links: [],
    };
  }

  //return analysis of all links for the user
  const allLinks = links.map((link) => ({
    _id: link._id,
    title: link.title,
    url: link.url,
    noOfClicks: link.noOfClicks || 0,
  }));

  //return analysis of all links for the user
  const analysis = {
    totalLinks: allLinks.length,
    totalClicks: allLinks.reduce((acc, link) => acc + link.noOfClicks, 0),
    links: allLinks,
  };

  return analysis;
};

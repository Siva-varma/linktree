import linkModel from "../../models/link.model.js";
import userModel from "../../models/user.model.js";



export const createLink = async (linkData) => {

    //check all required fields are present
    if (!linkData.title || !linkData.url || !linkData.userId) {
        throw new Error("All fields are required");
    }

    //check if link already exists for the user
    const existingLink = await linkModel.findOne({ url: linkData.url, user: linkData.userId });

    if (existingLink) {
        throw new Error("Link already exists for the user");
    }

    //create new link
    const newLink = await linkModel.create({
        title: linkData.title,
        url: linkData.url,
        user: linkData.userId,
    });

    return newLink;
}

export const getAllLinks = async (user) => {
    
    const userData = await userModel.findOne({ username: user });

    if (!userData) {
        throw new Error("User not found");
    }

    const links = await linkModel.find({ user: userData._id });

    return links;
}

export const editLink = async (linkId, linkData, userId) => {

    //check if link exists
    const existingLink = await linkModel.findOne({ _id: linkId, user: userId });

    if (!existingLink) {
        throw new Error("Link not found");
    }

    //check if link already exists for the user
    const duplicateLink = await linkModel.findOne({ url: linkData.url, user: userId });

    if (duplicateLink) {
        throw new Error("Link already exists for the user");
    }

    //update link
    existingLink.title = linkData.title || existingLink.title;
    existingLink.url = linkData.url || existingLink.url;

    await existingLink.save();

    return existingLink;
}
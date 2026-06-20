import linkModel from "../../models/link.model.js";


export const createLinkService = async (linkData) => {

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
import mongoose from "mongoose";


const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    url: {
        type: String,
        required: [true, "URL is required"],
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
    noOfClicks: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true});

const linkModel = mongoose.model("Link", linkSchema);

export default linkModel;
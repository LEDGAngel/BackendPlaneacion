import mongoose from "mongoose";

const itemShema = mongoose.Schema({
    name: {type: String, unique: true},
    price: {type: Number, default: 0},
}, {timestamps: true}
);

export default mongoose.model("item", itemShema);
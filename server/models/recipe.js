import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        trim: false,
        preserveLineBreaks: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    recipeImage: {
        type: String,
        trim: true
    }
});

recipeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Recipe = mongoose.model("Recipe", recipeSchema);

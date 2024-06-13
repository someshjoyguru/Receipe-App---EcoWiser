import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    trim: true,
    lowercase: true,
    validate: {
        validator: (value) => {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    required: true,
    type: String,
    select: false,
    validate: {
        validator: (value) => {
            return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(value);            ;
        },
        message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`,
    }
  }
});

export const User = mongoose.model("User", schema);

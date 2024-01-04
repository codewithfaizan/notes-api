import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 2,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sharednotes: {
    type: [Object]
  }
},
  { timestamps: true }
)

export default mongoose.model("Users", userSchema, "Users")
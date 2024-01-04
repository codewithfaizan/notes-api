import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: '_id'
  }
},
  { timestamps: true }
);

notesSchema.index({ title: 'text'})

export default mongoose.model("Notes", notesSchema, "Notes")
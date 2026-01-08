import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["REFRESH"],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);
export default Token;

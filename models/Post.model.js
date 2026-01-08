import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

/**
 * ❌ NO async(next)
 * ❌ NO next()
 * ✅ synchronous hook only
 */
postSchema.pre("save", function () {
  if (!this.isModified("title")) return;
  this.slug = slugify(this.title, { lower: true, strict: true });
});

/**
 * 🛡 Prevent duplicate model & duplicate hooks
 */
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

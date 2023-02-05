const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
  },
  { collection: "Posts" }
);

module.exports = mongoose.model("Post", postSchema);

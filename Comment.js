const commentSchema = new mongoose.Schema(
  {
    writer: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

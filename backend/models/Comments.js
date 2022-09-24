import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
      writer: { type: String, ref: 'User' },
      postId: {
        type: String,
        ref: 'Listing',
      },
      responseTo: {
        type: String,
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
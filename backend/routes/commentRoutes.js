
import express from 'express';
import Comment from '../models/Comments.js';

const commentRouter = express.Router();

commentRouter.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body) 
 
     comment.save((err, comment ) => {
         if(err) return res.json({ success:false, err})
 
         Comment.find({ '_id': comment._id })
         .populate('writer')
         .exec((err, result) => {
             if(err) return res.json({ success:false, err })
             return res.status(200).json({ success:true, result })
         })
 
     })
 
 });
 export default commentRouter;
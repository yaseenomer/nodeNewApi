import {Request as Req, Response as Res} from 'express'
import {Post} from '../models/Post'

export const allPosts = (req: Req, res: Res) => {
    Post.find({}, (err, posts) => {
        if (err) return res.send({err});
        return res.send(posts)
    })
};

export const createPost = (req: Req, res: Res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    post.save();
    res.send(post)
};

export const deletePost = (req: Req, res: Res) => {
    Post.deleteOne({ _id: req.params.postID}, (err) => {
        if (err) return res.send({err});
        return res.send({message: 'delete user successfully'})
    })
};
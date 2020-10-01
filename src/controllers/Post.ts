import  { Request as Req, Response as Res } from 'express'
import  { Post } from '../models/Post'

export const allPosts = async (req: Req, res: Res) => {
    const  posts =  await Post.findOne()

    res.send(posts)
}

export const createPost = (req: Req, res: Res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    post.save()
    res.send(post)
}
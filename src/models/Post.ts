import mongoose from 'mongoose'

export type PostDocument = mongoose.Document & {
    title: string;
    description: string;
    date: Date;


}

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}

});

export const Post = mongoose.model<PostDocument>('Post', postSchema)
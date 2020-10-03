import  express from 'express'
import * as postController from '../controllers/Post'

const router = express.Router();


router.post('/', postController.createPost);
router.get('/', postController.allPosts);
router.delete('/:postID', postController.deletePost);



module.exports =  router;
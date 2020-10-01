import  express from 'express'
import * as postController from '../controllers/Post'

const router = express.Router();


router.post('/', postController.createPost);
router.get('/', postController.allPosts)



module.exports =  router;
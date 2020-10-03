import  express from 'express'
import passport from "passport";
import * as userController from '../controllers/user'

const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false}), userController.login )
router.get('/users', passport.authenticate('jwt', { session: false}), userController.getUsers)
router.post('/register', userController.register)
router.get('/logout', userController.logOut)
router.get('/me', userController.me)

module.exports = router
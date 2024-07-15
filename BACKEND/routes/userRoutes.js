import express from 'express'
import { login, sample, signup, updateprofile, verifyUser} from '../controllers/userController.js'
import { uploadOptions } from '../config/multer.js'
const user_route = express.Router()


user_route.get('/',sample)
user_route.post('/signup',signup)
user_route.post('/login',login)
user_route.get('/home',verifyUser)
user_route.put('/updateprofile',uploadOptions.single('file'),updateprofile)
// user_route.put('/updateprofile',updateprofile)

export default user_route
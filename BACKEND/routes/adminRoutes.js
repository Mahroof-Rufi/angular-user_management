import express from 'express'
import {login ,users,delteUser,loadEditUser,updateUser,addUser, searchUser} from '../controllers/adminController.js'
import { uploadOptions } from '../config/multer.js'

const admin_route = express.Router()

admin_route.post('/login',login)
admin_route.get('/list',users)
admin_route.delete('/delete',delteUser)
admin_route.get('/edituser/:id',loadEditUser)
admin_route.post('/updateUser',updateUser)
admin_route.post('/search',searchUser)
admin_route.post('/adduser',addUser)


export default admin_route
import { Router } from 'express'
import {  allUsers, createUser, findUserId, showImage, updateUser } from '../controllers/users.controller.js'
import { uploadImage } from '../config/multer.js'
import { handleError } from '../middlewares/middleware.js'
import { verificarToken } from '../middlewares/auth.middleware.js'



const router = Router()

router.get('/', allUsers)
router.get('/:id', findUserId)
router.post('/', handleError, createUser)
router.patch('/update/:id', uploadImage.single('image'), updateUser)
router.get('/image/:nombre', verificarToken, showImage)


export default router
import { Router } from 'express'
import { info, login, } from '../controllers/auth.controller.js'
import { verificarToken } from '../middlewares/auth.middleware.js'



const router = Router()


router.post('/login', login )
router.get('/info', verificarToken, info)


export default router
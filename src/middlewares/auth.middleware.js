import jwt from 'jsonwebtoken'
import usersModels from '../models/users.model.js'

export const verificarToken = async (req, res, next) => {

    try {
      const { authorization } = req.headers
      const decode = jwt.verify(authorization, 'que123')
      const usuario = await usersModels.getById(decode.usuarioId)
      
      if (usuario.length === 0) return res.status(404).json({ message: 'el token no pertenece a ningún usuario '})

      req.user = usuario[0]

      next()
      console.log(decode)

    } catch (error) {

      if(error instanceof jwt.TokenExpiredError) {
        return res.status(400).json({ message: 'Token expirado '})
      }
      
      res.status(500).json({ message: error.message })
    }
  }


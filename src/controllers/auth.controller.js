import usersModels from "../models/users.model.js";
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await usersModels.getByEmail(email)
    if (usuario.length === 0 ) return res.status(404).json({ message: 'usuario no existe'})

    const esValido = await compare(password, usuario[0].password)
    if (!esValido) return res.status(400).json({ message: 'credenciales invalidas'})

      const token = jwt.sign({ usuarioId : usuario[0].user_id }, 'que123', {expiresIn: '1h'} )
      delete usuario[0].password
      res.json({ token, user: usuario[0] })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const info = async (req, res) => {
  delete req.user.password
 res.json(req.user)
}

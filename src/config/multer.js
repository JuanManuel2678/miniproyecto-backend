import multer from 'multer'
import usersModels from '../models/users.model.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/image')
    },

    filename: function (req, file, cb) {
      const newName = Date.now() + '-' + file.originalname
      cb(null, newName)
    }
})

  const imageFilter = async function (req, file, cb) {
    const { mimetype } = file
    const { email } = req.body
    
    const usuarioEmail = await usersModels.where('email', email)

    if (usuarioEmail.length > 0 ) {
       return  cb(new Error('Correo existente'))
    }
    if (mimetype.includes('image')) {
      cb(null, true)
    } else {
      cb(new Error('solo se aceptan imagenes '))
    }
  }
  
  export const uploadImage = multer({ storage, fileFilter: imageFilter })
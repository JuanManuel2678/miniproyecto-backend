import usersModels from "../models/users.model.js";
import path from 'path'
import fs from 'fs/promises'


export const allUsers = async (req, res) => {
  try {
    const usuarios = await usersModels.all();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = await usersModels.getById(id);

    if (usuarioId.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado " });
    }
    res.json(usuarioId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
try {
  const { name, lastname, bio, phone, email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: "Completar los campos obligatorios"})

  const [newUsers] = await usersModels.create({
    name,
    lastname,
    bio,
    phone,
    email,
    password
    });

    if (newUsers.affectedRows === 1 ) return res.json({message : 'Usuario creado y guardado correctamente '})
      res.status(500).json({ message : "error al guardar los datos del usuario"})

} catch (error) {
  res.status(500).json({ message: error.message })

}
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file
    const { name, lastname, bio, phone, password } = req.body;

    const usuarioId = await usersModels.getById(id)
    const [ updateUsuario ] = await usersModels.update( id,{
      name,
      lastname,
      bio,
      phone,
      password,
      image: filename
    })
    
    if (usuarioId.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado " });
    }
    if (updateUsuario.affectedRows === 1 ) return res.json({message : 'Usuario actualizado y guardado correctamente '})
      res.status(500).json({ message : "error al actualizar  los datos del usuario"})
    res.json(usuarioId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const showImage = async (req, res) => {
  try {
    const { name } = req.params
    const ruta = path.resolve(`/image/${name}`)
    await fs.access(ruta)

    res.sendFile(ruta)
  } catch (error) {
    if (error.errno === -4058) {
       return res.status(404).json({ message: 'no se encontró la imagen'})
    }
    res.status(500).json({ message: error.message })
  }
}




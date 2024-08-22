import { pool } from '../config/db.js'
import { hash } from 'bcrypt';

class usersModels {

    static async all () {
      const [usuarios] = await pool.execute("SELECT * FROM users");
      return usuarios
    }

    static async getById (id) {
      const [usuario] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [id])
      return usuario
    }

    static async where (campo, valor ) {
      const [usuario] = await pool.execute(`SELECT * FROM users WHERE ${campo} = ?`, [valor])
      return usuario
    }

    static async create ({ name, lastname, bio, phone, email, password }) {
      const encriptado = await hash(password, 10)
      const campos = ['email', 'password']
      const values = [ email, encriptado ]

      if (name) {
        campos.push('name')
        values.push(name)
      }
      if (lastname) {
        campos.push('lastname')
        values.push(lastname)
      }
      if (bio) {
        campos.push('bio')
        values.push(bio)
      }
      if (phone) {
        campos.push('phone')
        values.push(phone)
      }
 
      const cString = campos.join(', ')
      const placeholders = values.map(() => '?').join(', ')
      const newUsuario = await pool.execute(`INSERT INTO users(${cString}) VALUES (${placeholders})`, values)
      return newUsuario
    }

    static async update (id, { name, lastname, bio, phone, password }) {
      const encriptado = await hash(password, 10)

     if (password) {
      campos.push('password = IF NULL(?, password) ')
      values.push(encriptado)
     }

      if (name) {
        campos.push('name = IFNULL(?, name)')
        values.push(name)
      }
      if (lastname) {
        campos.push('lastname = IFNULL(?, lastname) ')
        values.push(lastname)
      }
      if (bio) {
        campos.push('bio = IFNULL(?, bio)')
        values.push(bio)
      }
      if (phone) {
        campos.push('phone = IFNULL (?, phone)')
        values.push(phone)
      }
      if (image) {
         campos.push('image = IFNULL (?, image)')
         values.push(image)
       }

       const cString = campos.join(', ')
       // const placeholders = values.map(() => '?').join(', ')
       const updateUser = await pool.execute(`UPDATE users SET ${cString} where user.user_id = ? ,  values`)
       return updateUser
    }

    static async getByEmail (email) {
      const [usuario] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
      return usuario
    }
}
 
export default usersModels



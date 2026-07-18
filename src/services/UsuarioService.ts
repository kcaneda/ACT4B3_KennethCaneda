import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../data/UsuarioRepository";
import { validarUsuarios, validarIdUsuario } from "../validations/UserValidations";

export class UsuarioService {
    private repository = new UsuarioRepository;

    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuario();
    }

    async agregar(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuario();
            const existeId = usuarios.some(u => u.id === usuario.id);
            if (existeId) {
                throw new Error("El usuario con ese ID ya existe.")
            }
            validarUsuarios(usuario.id, usuario.nombre, usuario.apellido, usuario.edad, usuario.correo, usuario.correo, usuario.rol, usuario.estado);
            usuarios.push(usuario);
            await this.repository.guardarUsuario(usuarios);
            console.log("Usuario agregado correctamente.")
        } catch (error) {
            console.error("Error al agregar el usuario")
            throw error;
        }
    }

    async buscar(id: number): Promise<Usuario | undefined> {
            const usuarios = await this.repository.obtenerUsuario();
            validarIdUsuario(id);
            return usuarios.find(u => u.id === id);
    }

    async actualizar(usuario:Usuario): Promise<void>{
        try {
            const usuarios = await this.repository.obtenerUsuario();
            const indice = usuarios.findIndex(u => u.id === usuario.id);
            if(indice === -1) {
                throw new Error("El usuario no existe.")
            }
            validarUsuarios(usuario.id, usuario.nombre, usuario.apellido, usuario.edad, usuario.correo, usuario.correo, usuario.rol, usuario.estado);
            usuarios[indice] = usuario;
            await this.repository.guardarUsuario(usuarios);
            console.log("Usuario actualizado correctamente.")
        } catch (error) {
            console.error("Error al actualizar el usuario")
            throw error;
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuario();
            validarIdUsuario(id);
            const nuevos = usuarios.filter(u => u.id !==id);
            if(nuevos.length === usuarios.length) {
                throw new Error("El usuario no existe.");
            }

            await this.repository.guardarUsuario(nuevos);
            console.log("Usuario eliminado correctamente.");

        } catch (error) {
            console.error("Error al eliminar el usuario")
            throw error;
        }

    }
}
import { UsuarioService } from "./UsuarioService";
import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class AuthService {
    private repository = new UsuarioRepository;
    private service = new UsuarioService;
    async login(correo:string, contraseña:string): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuario();
            const correoCorrecto = await usuarios.some(u => u.correo === correo);
            const contraseñaCorrecta = await usuarios.some(u => u.contraseña === contraseña);
            if(correoCorrecto && contraseñaCorrecta){
                console.log("Se inició sesión con éxito.");
            } else {
                throw new Error("Credenciales incorrectas.");
            }
        } catch (error) {
            console.error("No se pudo iniciar sesión");
            throw error;
        }
    }

    async register(usuario:Usuario): Promise<void>{
        await this.service.agregar(usuario);
    }

}
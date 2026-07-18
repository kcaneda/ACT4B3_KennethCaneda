import { readFile, writeFile } from "fs/promises";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository {
    //Dar la ruta de donde se almacenara el archivo JSON
    private ruta = "./src/data/usuarios.json";
    //Metodo para obtener usuarios | mostrar usuarios
    async obtenerUsuario(): Promise<Usuario[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    //Metodo para guardar usuarios | actualizar | usuario
    async guardarUsuario(usuarios: Usuario[]): Promise<void>{
        try {
            await writeFile(
                this.ruta, 
                //Base | modelo, modificando, no.tabulacion
                //No. tabulación : 4 es el número de la estructura JSON
                JSON.stringify(usuarios, null, 4))
        } catch (error) {
            console.error("Error al guardar el usuario")
            throw error;
        }

    }
}

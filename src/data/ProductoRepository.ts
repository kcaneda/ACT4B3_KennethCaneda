import { readFile, writeFile } from "fs/promises";
import { Producto } from "../models/Producto";

export class ProductoRepository {
    //Dar la ruta de donde se almacenara el archivo JSON
    private ruta = "./src/data/productos.json";
    //Metodo para obtener productos | mostrar productos
    async obtenerProducto(): Promise<Producto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            return []
        }
    }

    //Metodo para guardar productos | actualizar | usuario
    async guardarProducto(productos: Producto[]): Promise<void>{
        try {
            await writeFile(
                this.ruta, 
                //Base | modelo, modificando, no.tabulacion
                //No. tabulación : 4 es el número de la estructura JSON
                JSON.stringify(productos, null, 4))
        } catch (error) {
            console.error("Error al guardar el producto")
            throw error;
        }

    }
}

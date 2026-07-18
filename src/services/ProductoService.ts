import { Producto } from "../models/Producto";
import { ProductoRepository } from "../data/ProductoRepository";
import { validarProductos, validarIdProducto } from "../validations/ProductValidations";

export class ProductoService {
    private repository = new ProductoRepository;

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProducto();
    }

    async agregar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProducto();
            const existeId = productos.some(u => u.id === producto.id);
            if (existeId) {
                throw new Error("El producto con ese ID ya existe.")
            }
            validarProductos(producto.id, producto.nombre, producto.precio, producto.stock);
            productos.push(producto);
            await this.repository.guardarProducto(productos);
            console.log("Producto agregado correctamente.")
        } catch (error) {
            console.error("Error al agregar el producto")
            throw error;
        }
    }

    async buscar(id: number): Promise<Producto | undefined> {
        const productos = await this.repository.obtenerProducto();
        validarIdProducto(id);
        return productos.find(u => u.id === id);
    }

    async actualizar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProducto();
            const indice = productos.findIndex(u => u.id === producto.id);
            if (indice === -1) {
                throw new Error("El producto no existe.")
            }
            validarProductos(producto.id, producto.nombre, producto.precio, producto.stock); 
            productos[indice] = producto;
            await this.repository.guardarProducto(productos);
            console.log("Producto actualizado correctamente.")
        } catch (error) {
            console.error("Error al actualizar el producto")
            throw error;
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const productos = await this.repository.obtenerProducto();
            validarIdProducto(id);
            const nuevos = productos.filter(u => u.id !== id);
            if (nuevos.length === productos.length) {
                throw new Error("El producto no existe.");
            }

            await this.repository.guardarProducto(nuevos);
            console.log("Producto eliminado correctamente.");

        } catch (error) {
            console.error("Error al eliminar el producto.")
            throw error;
        }

    }
}
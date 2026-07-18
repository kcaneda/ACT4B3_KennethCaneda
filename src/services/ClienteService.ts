import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../data/ClienteRepository";
import { validarClientes, validarIdCliente } from "../validations/ClientValidations";

export class ClienteService {
    private repository = new ClienteRepository;

    async listar(): Promise<Cliente[]>{
        return await this.repository.obtenerCliente();
    }

    async agregar(cliente:Cliente):Promise<void>{
        try {
            const clientes = await this.repository.obtenerCliente();
            const existeId = clientes.some(c => c.id === cliente.id);
            if(existeId){
                throw new Error("El cliente con ese ID ya existe.");
            }
            validarClientes(cliente.id, cliente.nombre, cliente.apellido, cliente.telefono, cliente.direccion);
            clientes.push(cliente);
            await this.repository.guardarCliente(clientes);
            console.log("Cliente agregado correctamente.");
        } catch (error) {
            console.error("Error al agregar el cliente.");
            throw error;
        }
    }

    async buscar(id: number): Promise<Cliente | undefined> {
        const clientes = await this.repository.obtenerCliente();
        validarIdCliente(id);
        return clientes.find(c => c.id === id);
    }

    async actualizar(cliente:Cliente):Promise<void>{
        try {
            const clientes = await this.repository.obtenerCliente();
            const indice = clientes.findIndex(c => c.id === cliente.id);
            if(indice === -1){
                throw new Error("El cliente no existe.");
            }
            validarClientes(cliente.id, cliente.nombre, cliente.apellido, cliente.telefono, cliente.direccion);
            clientes[indice] = cliente;
            await this.repository.guardarCliente(clientes);
            console.log("Cliente actualizado correctamente.");
        } catch (error) {
            console.error("Error al actualizar el cliente.");
            throw error;
        }
    }

    async eliminar(id:number):Promise<void>{
        try {
            const clientes = await this.repository.obtenerCliente();
            validarIdCliente(id);
            const nuevos = clientes.filter(c => c.id !==id);
            if(nuevos.length === clientes.length){
                throw new Error("El cliente no existe.");
            }

            await this.repository.guardarCliente(nuevos);
            console.log("Cliente eliminado correctamente.");
        } catch (error) {
            console.error("Error al eliminar el cliente.");
            throw error;
        }
    }
}
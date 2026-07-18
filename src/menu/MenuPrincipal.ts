import { UsuarioService } from "../services/UsuarioService";
import { rl } from "../utils/Readline";
import { Rol } from "../models/Rol";
import { Estado } from "../models/Estado";
import { AuthService } from "../services/AuthService";
import { ProductoService } from "../services/ProductoService";
import { ClienteService } from "../services/ClienteService";

const userService = new UsuarioService;
const productService = new ProductoService;
const clientService = new ClienteService;

const auth = new AuthService;

export async function authentication() {
    let opcion: number = 0
    let correo;
    let contraseña;
    let id: number;
    let nombre: string;
    let apellido: string;
    let edad: number;
    let rolT: string;
    let estadoT: string;
    do {
        console.log("====Inicio de Sesión====")
        console.log("1. Iniciar Sesión")
        console.log("2. Registrarse")
        console.log("3. Salir")

        opcion = Number(await rl.question("Seleccione una opción: "))
        switch (opcion) {
            case 1:
                correo = await rl.question("Ingrese su correo electrónico: ");
                contraseña = await rl.question("Ingrese su contraseña: ");
                await auth.login(correo, contraseña);
                await menuPrincipal();
                break;
            case 2:
                id = Number(await rl.question("Ingrese el ID del usuario a crear: "))

                nombre = await rl.question("Ingrese el nombre del usuario: ");
                apellido = await rl.question("Ingrese el apellido del usuario: ");
                edad = Number(await rl.question("Ingrese la edad del usuario: "));
                correo = await rl.question("Ingrese el correo del usuario: ");
                contraseña = await rl.question("Ingrese la contraseña del usuario: ")
                rolT = await rl.question("Ingrese el rol del usuario: (ADMIN, USUARIO): ")
                estadoT = await rl.question("Ingrese el estado del usuario: (ACTIVO, INACTIVO, SUSPENDIDO): ")
                await auth.register({ id, nombre, apellido, edad, correo, contraseña, rol: rolT.toUpperCase() as Rol, estado: estadoT as Estado });
                break;
            case 3:
                console.log("Has salido del programa.")
                break;
            default:
                console.log("opcion no válida.")
                break;

        }
        rl.close;

    } while (opcion !== 3) {
    }

}


export async function menuUsuarios() {
    let id: number;
    let nombre: string;
    let apellido: string;
    let edad: number;
    let correo: string;
    let contraseña: string;
    let rolT: string;
    let estadoT: string;
    let opcion: number = 0
    do {
        console.log("=== Menú Principal ===")
        console.log("1. Listar usuarios")
        console.log("2. Agregar usuario")
        console.log("3. Buscar usuario")
        console.log("4. Actualizar usuario")
        console.log("5. Eliminar usuario")
        console.log("6. Salir")

        opcion = Number(await rl.question("Seleccione una opción: "));

        switch (opcion) {
            case 1:
                console.table(await userService.listar())
                break
            case 2:

                id = Number(await rl.question("Ingrese el ID del usuario a listar: "))

                nombre = await rl.question("Ingrese el nombre del usuario: ");
                apellido = await rl.question("Ingrese el apellido del usuario: ");
                edad = Number(await rl.question("Ingrese la edad del usuario: "));
                correo = await rl.question("Ingrese el correo del usuario: ");
                contraseña = await rl.question("Ingrese la contraseña del usuario: ")
                rolT = await rl.question("Ingrese el rol del usuario: (ADMIN, USUARIO): ")
                estadoT = await rl.question("Ingrese el estado del usuario: (ACTIVO, INACTIVO, SUSPENDIDO): ")

                await userService.agregar({ id, nombre, apellido, edad, correo, contraseña, rol: rolT.toUpperCase() as Rol, estado: estadoT as Estado })
                break
            case 3:
                id = Number(await rl.question("Ingrese el ID del usuario a buscar: "));
                console.table(await userService.buscar(id));
                break;
            case 4:
                id = Number(await rl.question("Ingrese el ID del usuario a actualizar: "))
                nombre = await rl.question("Ingrese el nombre del usuario: ");
                apellido = await rl.question("Ingrese el apellido del usuario: ");
                edad = Number(await rl.question("Ingrese la edad del usuario: "));
                correo = await rl.question("Ingrese el correo del usuario: ");
                contraseña = await rl.question("Ingrese la contraseña del usuario: ")
                rolT = await rl.question("Ingrese el rol del usuario: (ADMIN, USUARIO): ")
                estadoT = await rl.question("Ingrese el estado del usuario (ACTIVO, INACTIVO, SUSPENDIDO): ")
                await userService.actualizar({ id, nombre, apellido, edad, correo, contraseña, rol: rolT.toUpperCase() as Rol, estado: estadoT as Estado });
                break
            case 5:
                id = Number(await rl.question("Ingrese el ID del usuario que desea eliminar: "));
                await userService.eliminar(id);
                break
            case 6:
                console.log("Saliendo...")
                break
            default:
                console.log("Opción no válida.")
        }
        rl.close();
    } while (opcion !== 6) {

    }
}


export async function menuProductos() {
    let id: number;
    let nombre: string;
    let precio: number;
    let stock: number;
    let opcion: number = 0
    do {
        console.log("=== Menú Principal ===")
        console.log("1. Listar productos")
        console.log("2. Agregar producto")
        console.log("3. Buscar producto")
        console.log("4. Actualizar producto")
        console.log("5. Eliminar producto")
        console.log("6. Salir")

        opcion = Number(await rl.question("Seleccione una opción: "));

        switch (opcion) {
            case 1:
                console.table(await productService.listar())
                break
            case 2:

                id = Number(await rl.question("Ingrese el ID del producto a listar: "))

                nombre = await rl.question("Ingrese el nombre del producto: ");
                precio = Number(await rl.question("Ingrese el precio del producto: "));
                stock = Number(await rl.question("Ingrese el stock del producto: "));

                await productService.agregar({ id, nombre, precio, stock })
                break
            case 3:
                id = Number(await rl.question("Ingrese el ID del producto a buscar: "));
                console.table(await productService.buscar(id));
                break;
            case 4:
                id = Number(await rl.question("Ingrese el ID del producto a actualizar: "))
                nombre = await rl.question("Ingrese el nombre del producto: ");
                precio = Number(await rl.question("Ingrese el precio del producto: "));
                stock = Number(await rl.question("Ingrese el stock del producto: "));
                await productService.actualizar({ id, nombre, precio, stock });
                break
            case 5:
                id = Number(await rl.question("Ingrese el ID del producto que desea eliminar: "));
                await productService.eliminar(id);
                break
            case 6:
                console.log("Saliendo...")
                break
            default:
                console.log("Opción no válida.")
        }
        rl.close;
    } while (opcion !== 6) {

    }
}


export async function menuClientes() {
    let id: number;
    let nombre: string;
    let apellido: string;
    let telefono: string;
    let direccion: string;
    let opcion: number = 0
    do {
        console.log("=== Menú Principal ===")
        console.log("1. Listar clientes")
        console.log("2. Agregar cliente")
        console.log("3. Buscar cliente")
        console.log("4. Actualizar cliente")
        console.log("5. Eliminar cliente")
        console.log("6. Salir")

        opcion = Number(await rl.question("Seleccione una opción: "));

        switch (opcion) {
            case 1:
                console.table(await clientService.listar())
                break
            case 2:

                id = Number(await rl.question("Ingrese el ID del cliente a agregar: "))

                nombre = await rl.question("Ingrese el nombre del cliente: ");
                apellido = await rl.question("Ingrese el apellido del cliente: ");
                telefono = await rl.question("Ingrese el teléfono del cliente: ");
                direccion = await rl.question("Ingrese la dirección del cliente: ");

                await clientService.agregar({ id, nombre, apellido, telefono, direccion })
                break
            case 3:
                id = Number(await rl.question("Ingrese el ID del cliente a buscar: "));
                console.table(await clientService.buscar(id));
                break;
            case 4:
                id = Number(await rl.question("Ingrese el ID del cliente a actualizar: "))
                nombre = await rl.question("Ingrese el nombre del cliente: ");
                apellido = await rl.question("Ingrese el apellido del cliente: ");
                telefono = await rl.question("Ingrese el teléfono del cliente: ");
                direccion = await rl.question("Ingrese la dirección del cliente: ");
                await clientService.actualizar({ id, nombre, apellido, telefono, direccion });
                break
            case 5:
                id = Number(await rl.question("Ingrese el ID del cliente que desea eliminar: "));
                await clientService.eliminar(id);
                break
            case 6:
                console.log("Saliendo...")
                break
            default:
                console.log("Opción no válida.")
        }
        rl.close;
    } while (opcion !== 6) {

    }
}

export async function menuPrincipal() {
    let opcion: number = 0
    do {
        console.log("=== Menú Principal ===")
        console.log("1. Usuarios")
        console.log("2. Productos")
        console.log("3. Clientes")
        console.log("4. Salir")
        opcion = Number(await rl.question("Seleccione una opción: "));
        switch (opcion) {
            case 1:
                await menuUsuarios();
                break;
            case 2:
                await menuProductos();
                break;
            case 3:
                await menuClientes();
                break;
            case 4:
                console.log("Saliendo del programa.");
                break;
            default:
                console.log("Opción no válida.");
                break;
        }
    } while (opcion !== 4) {
    }
}
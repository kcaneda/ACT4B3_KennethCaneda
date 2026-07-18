
export const validarClientes = (id: number, nombre: string, apellido: string, telefono: string, direccion: string): void => {
    if (isNaN(id)) {
        throw new Error("El ID debe ser un número.");
    }
    if (!Number.isInteger(id)) {
        throw new Error("El ID debe ser un número entero.");
    }
    if (id < 0) {
        throw new Error("El ID no puede ser negativo.");
    }

    if (nombre.trim() === "") {
        throw new Error("El nombre no puede estar vacío.");
    }
    if (nombre.trim().length < 3) {
        throw new Error("El nombre debe tener al menos 3 caracteres.");
    }

    if (apellido.trim() === "") {
        throw new Error("El apellido no puede estar vacío.");
    }
    if (apellido.trim().length < 3) {
        throw new Error("El apellido debe tener al menos 3 caracteres.");
    }

    if (telefono.trim() === "") {
        throw new Error("El teléfono no puede estar vacío.");
    }
    if (!/^\d{8}$/.test(telefono.trim())) {
        throw new Error("El teléfono debe contener 8 dígitos numéricos.");
    }

    if (direccion.trim() === "") {
        throw new Error("La dirección no puede estar vacía.");
    }
    if (direccion.trim().length < 5) {
        throw new Error("La dirección debe tener al menos 5 caracteres.");
    }
}

export const validarIdCliente = (id: number): void => {
    if (isNaN(id)) {
        throw new Error("El ID debe ser un número.");
    }
    if (!Number.isInteger(id)) {
        throw new Error("El ID debe ser un número entero.");
    }
    if (id < 0) {
        throw new Error("El ID no puede ser negativo.");
    }
}
import { Persona } from "./Entidades";

export class Paciente extends Persona {
    constructor(id: string, nombre: string, apellido: string, dni: number, telefono: string, email: string) {
        super(id, nombre, apellido, dni, telefono, email);
    }
}

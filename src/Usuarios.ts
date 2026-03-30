import { Persona } from "./Entidades";

export class Paciente extends Persona {
    private _fechaNacimiento: Date;

    constructor(
        id: string, 
        nombre: string, 
        apellido: string, 
        dni: number, 
        telefono: string, 
        email: string,
        fechaNacimiento: Date, 
        obraSocial: string = ""
    ) {
        super(id, nombre, apellido, dni, telefono, email);
        this ._fechaNacimiento = fechaNacimiento;
    }

     get fechaNacimiento(): Date{
        return this._fechaNacimiento;
    }

    set fechaNacimiento(valor: Date){
        this._fechaNacimiento = valor;
    }
}

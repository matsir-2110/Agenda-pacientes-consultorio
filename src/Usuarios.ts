import { Persona } from "./Entidades";
import { FichaClinica } from "./Clinica";

/* Paciente */
export class Paciente extends Persona {
    private _fechaNacimiento: Date;
    private _fichaClinica: FichaClinica;

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
        
        this._fichaClinica = new FichaClinica(`ficha-${id}`, obraSocial);
    }

    get fechaNacimiento(): Date{
        return this._fechaNacimiento;
    }

    get fichaClinica(): FichaClinica{ 
        return this._fichaClinica; 
    }

    set fechaNacimiento(valor: Date){
        this._fechaNacimiento = valor;
    }

    get edad(): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - this._fechaNacimiento.getFullYear();
        const mesActual = hoy.getMonth();
        const mesBirth = this._fechaNacimiento.getMonth();
        if ((mesActual < mesBirth) || (mesActual === mesBirth && hoy.getDate() < this._fechaNacimiento.getDate())){
            edad--;
        }
        return edad;
    }
}


/* Odontologo */
export type Especialidad =
    | "Odontologia General"
    | "Ortodoncia"
    | "Endodoncia"
    | "Periodoncia"
    | "Implantologia"
    | "Odontopediatria";

export class Odontologo extends Persona {
    private _matricula: string;
    private _especialidad: Especialidad;
 
    constructor(
        id: string,
        nombre: string,
        apellido: string,
        dni: number,
        telefono: string,
        email: string,
        matricula: string,
        especialidad: Especialidad
    ) {
        super(id, nombre, apellido, dni, telefono, email);
        if (!matricula.trim()) throw new Error("La matrícula no puede estar vacía.");
        this._matricula = matricula.trim();
        this._especialidad = especialidad;
    }
 
    get matricula(): string { return this._matricula; }
    get especialidad(): Especialidad { return this._especialidad; }
 
    set especialidad(valor: Especialidad) { this._especialidad = valor; }
}
import type { IEntidad } from "./Entidades";


/* Antecedente Médico */
export class AntecedenteMedico implements IEntidad {
    private _id: string;
    private _descripcion: string;
    private _fechaRegistro: Date;
 
    constructor(id: string, descripcion: string, fechaRegistro: Date = new Date()){
        if (!descripcion.trim()){
            throw new Error("La descripción del antecedente no puede estar vacía.");
        }
        this._id = id;
        this._descripcion = descripcion.trim();
        this._fechaRegistro = fechaRegistro;
    }
 
    get id(): string{
        return this._id;
    }
    get descripcion(): string{ 
        return this._descripcion; 
    }
    get fechaRegistro(): Date{ 
        return this._fechaRegistro; 
    }
 
    set descripcion(valor: string){
        if (!valor.trim()) throw new Error("La descripción no puede estar vacía.");
        this._descripcion = valor.trim();
    }
}


/* Tratamiento */
export type EstadoTratamiento = 
    | "pendiente"
    | "en_progreso"
    | "completado"
    | "cancelado";
 
export class Tratamiento implements IEntidad {
    private _id: string;
    private _nombre: string;
    private _descripcion: string;
    private _costo: number;
    private _estado: EstadoTratamiento;
    private _fechaInicio: Date;
    private _fechaFin: Date | null;
 
    constructor(
        id: string,
        nombre: string,
        descripcion: string,
        costo: number,
        fechaInicio: Date = new Date()
    ) {
        this._id = id;
        this._nombre = nombre.trim();
        this._descripcion = descripcion.trim();
        this._costo = costo;
        this._estado = "pendiente";
        this._fechaInicio = fechaInicio;
        this._fechaFin = null;
    }

    get id(): string{
        return this._id;
    }

    get nombre(): string{ 
        return this._nombre; 
    }
    
    get descripcion(): string{ 
        return this._descripcion; 
    }
    
    get costo(): number{ 
        return this._costo; 
    }
    
    get estado(): EstadoTratamiento{ 
        return this._estado; 
    }
    
    get fechaInicio(): Date{
        return this._fechaInicio; 
    }
    
    get fechaFin(): Date | null{ 
        return this._fechaFin; 
    }
 
    set nombre(valor: string) {
        if (!valor.trim()) throw new Error("El nombre del tratamiento no puede estar vacío.");
        this._nombre = valor.trim();
    }
 
    set costo(valor: number) {
        if (valor < 0) throw new Error("El costo no puede ser negativo.");
        this._costo = valor;
    }
}


/* Ficha clínica */
export class FichaClinica implements IEntidad {
    private _id: string;
    private _tratamientos: Tratamiento[];
    private _antecedentes: AntecedenteMedico[];
    private _obraSocial: string;
 
    constructor(id: string, obraSocial: string = "") {
        this._id = id;
        this._obraSocial = obraSocial;
        this._tratamientos = [];
        this._antecedentes = [];
    }
 
    get id(): string{ 
        return this._id; 
    }

    get obraSocial(): string{ 
        return this._obraSocial;
    }



}
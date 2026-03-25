export interface IEntidad {
    readonly id: string;
}

export class Persona implements IEntidad {
    private _id: string;
    private _nombre: string;
    private _apellido: string;
    private _dni: number;
    private _telefono: string;
    private _email: string;

    constructor(id: string, nombre: string, apellido: string, dni: number, telefono: string, email: string) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._telefono = telefono;
        this._email = email;
    }

    //Getters
    get id(): string {
        return this._id;
    }
    get nombre(): string {
        return this._nombre;
    }
    get apellido(): string {
        return this._apellido;
    }
    get dni(): number {
        return this._dni;
    }
    get telefono(): string {
        return this._telefono;
    }
    get email(): string {
        return this._email;
    }

    //Setters
    set nombre(nombre: string) {
        if (!nombre.trim()) {
            throw new Error("El nombre no puede estar vacío.");
        }
        this._nombre = nombre;
    }

    set apellido(apellido: string) {
        if (!apellido.trim()) {
            throw new Error("El apellido no puede estar vacío.");
        }
        this._apellido = apellido;
    }

    set dni(dni: number) {
        if (dni <= 0 || dni > 99999999) {
            throw new Error("El DNI ingresado no es válido.");
        }
        this._dni = dni;
    }

    set telefono(telefono: string) {
        this._telefono = telefono;
    }

    set email(email: string) {
        this._email = email;
    }

    get nombreCompleto(): string {
        return `${this._apellido}, ${this._nombre}`;
    }
}
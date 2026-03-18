class Paciente {
    private _nombre: string = "";
    private _apellido: string = "";
    private _dni: number = 0;
    private _fechaNacimiento: Date = new Date();
    private _telefono: string = "";
    private _email: string = "";
    private _obraSocial: string = "";

    set nombre(nombre: string) {
        this._nombre = nombre;
    }
    set apellido(apellido: string) {
        this._apellido = apellido;
    }
    set dni(dni: number) {
        this._dni = dni;
    }
    set fechaNacimiento(fechaNacimiento: Date) {
        this._fechaNacimiento = fechaNacimiento;
    }
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
    set email(email: string) {
        this._email = email;
    }
    set obraSocial(obraSocial: string) {
        this._obraSocial = obraSocial;
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
    get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }
    get telefono(): string {
        return this._telefono;
    }
    get email(): string {
        return this._email;
    }
    get obraSocial(): string {
        return this._obraSocial;
    }
}

export { Paciente };
import type { IEntidad } from "./Entidades";
import { Paciente, Odontologo } from "./Usuarios";

export type EstadoTurno = 
                        | "programado" 
                        | "confirmado" 
                        | "completado" 
                        | "cancelado" 
                        | "ausente";


/* Turno */
export class Turno implements IEntidad {
    private _id: string;
    private _paciente: Paciente;
    private _odontologo: Odontologo;
    private _fechaHora: Date;
    private _motivoConsulta: string;
    private _estado: EstadoTurno;

    constructor(
        id: string,
        paciente: Paciente,
        odontologo: Odontologo,
        fechaHora: Date,
        motivoConsulta: string
    ) {
        this._id = id;
        this._paciente = paciente;
        this._odontologo = odontologo;
        this._fechaHora = fechaHora;
        this._motivoConsulta = motivoConsulta.trim();
        this._estado = "programado";
    }

    get id(): string{ 
        return this._id; 
    }

    get paciente(): Paciente{ 
        return this._paciente; 
    }
    
    get odontologo(): Odontologo{ 
        return this._odontologo; 
    }
    
    get fechaHora(): Date{ 
        return this._fechaHora; 
    }
    
    get estado(): EstadoTurno{ 
        return this._estado; 
    }

    // Cambio de estado
    cancelar(): void {
        this._estado = "cancelado";
    }

    completar(): void {
        this._estado = "completado";
    }
}

/* Agenda */
export class Agenda {
    private _turnos: Turno[];

    constructor() {
        this._turnos = [];
    }

    get turnos(): Turno[] {
        return this._turnos;
    }

    agregarTurno(nuevoTurno: Turno): void {
        //El doctor esta ocupado?
        for (const t of this._turnos) {
            const mismaHora = t.fechaHora.getTime() === nuevoTurno.fechaHora.getTime();
            const mismoOdontologo = t.odontologo.id === nuevoTurno.odontologo.id;
            const noEstaCancelado = t.estado !== "cancelado";

            if (mismaHora && mismoOdontologo && noEstaCancelado) {
                throw new Error(`El odontólogo ya tiene un turno asignado a las ${nuevoTurno.fechaHora.toLocaleTimeString()}`);
            }
        }

        this._turnos = [...this._turnos, nuevoTurno];
    }

    obtenerTurnosDePaciente(idPaciente: string): Turno[] {
        let resultados: Turno[] = [];
        for (const t of this._turnos) {
            if (t.paciente.id === idPaciente) {
                resultados = [...resultados, t];
            }
        }
        return resultados;
    }

    // Buscar turnos por fecha (Ignorando la hora para ver el día completo)
    obtenerTurnosPorFecha(fecha: Date): Turno[] {
        let resultados: Turno[] = [];
        for (const t of this._turnos) {
            const esMismoDia = 
                t.fechaHora.getDate() === fecha.getDate() &&
                t.fechaHora.getMonth() === fecha.getMonth() &&
                t.fechaHora.getFullYear() === fecha.getFullYear();
            
            if (esMismoDia) {
                resultados = [...resultados, t];
            }
        }
        return resultados;
    }

    // Método simple para cancelar
    cancelarTurno(idTurno: string): void {
        for (const t of this._turnos) {
            if (t.id === idTurno) {
                t.cancelar();
                return;
            }
        }
        throw new Error("No se encontró el turno para cancelar.");
    }
}
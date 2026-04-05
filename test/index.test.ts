import { test, describe, it, expect, beforeEach } from 'vitest';
import { Paciente, Odontologo, Turno, Agenda, Tratamiento, AntecedenteMedico } from "../src/index";

describe('Test para probar CI', () => {
    test('El testeo en CI anda', () => {
        expect(1 + 1).toBe(2);
    });
});

describe("Agenda para odontólogo test main", () => {
    let paciente: Paciente;
    let odontologo: Odontologo;
    let agenda: Agenda;

    //Se crean los usuarios básicos
    beforeEach(() => {
        // Setup básico para cada test
        paciente = new Paciente("p1", "Máximo", "Repka", 46775177, "3794359989", "maximors2110@gmail.com", new Date("2005-10-21"));
        odontologo = new Odontologo("o1", "Marcelo", "Repka", 20123456, "3794123456", "marcelo@clinica.com", "MP-999", "Ortodoncia");
        agenda = new Agenda();
    });


    //Test Ficha Clínica
    describe("Ficha Clínica y Paciente", () => {
        it("debería crear una ficha automáticamente al crear un paciente", () => {
            expect(paciente.fichaClinica).toBeDefined();
            expect(paciente.fichaClinica.id).toBe("ficha-p1");
        });

        it("no debería permitir duplicar tratamientos por ID", () => {
            const t1 = new Tratamiento("t1", "Limpieza", "Limpieza profunda", 5000);
            paciente.fichaClinica.agregarTratamiento(t1);
            
            expect(() => {
                paciente.fichaClinica.agregarTratamiento(t1);
            }).toThrow(/ya existe/);
        });

        it("debería calcular la edad correctamente", () => {
            //(Teniendo en cuenta que estamos en abril)
            expect(paciente.edad).toBe(20);
        });
    });


    //Test Agenda
    describe("Gestión de Turnos", () => {
        it("debería agregar un turno correctamente", () => {
            const fecha = new Date("2026-05-10T10:00:00");
            const turno = new Turno("tr1", paciente, odontologo, fecha, "Extracción");
            
            agenda.agregarTurno(turno);
            expect(agenda.turnos).toHaveLength(1);
        });

        it("debería bloquear turnos en el mismo horario para el mismo odontólogo", () => {
            const fecha = new Date("2026-05-10T10:00:00");
            const turno1 = new Turno("tr1", paciente, odontologo, fecha, "Consulta");
            const turno2 = new Turno("tr2", paciente, odontologo, fecha, "Urgencia");

            agenda.agregarTurno(turno1);
            
            expect(() => {
                agenda.agregarTurno(turno2);
            }).toThrow(/ya tiene un turno/);
        });

        it("debería filtrar turnos por paciente correctamente", () => {
            const fecha = new Date("2026-05-10T10:00:00");
            const t1 = new Turno("tr1", paciente, odontologo, fecha, "C1");
            agenda.agregarTurno(t1);
            
            const misTurnos = agenda.obtenerTurnosDePaciente("p1");
            expect(misTurnos).toHaveLength(1);
            expect(misTurnos[0]?.paciente.nombre).toBe("Máximo");
        });

        it("debería permitir agendar en un horario de un turno previamente cancelado", () => {
            const fecha = new Date("2026-06-01T10:00:00");
            const turno1 = new Turno("t1", paciente, odontologo, fecha, "Consulta");
            agenda.agregarTurno(turno1);
            
            agenda.cancelarTurno("t1");
            expect(turno1.estado).toBe("cancelado");
            
            const turno2 = new Turno("t2", paciente, odontologo, fecha, "Consulta nueva");
            expect(agenda.turnos).toHaveLength(2);
            expect(agenda.turnos).toContain(turno2);

            expect(agenda.turnos[0]?.id).toBe("t1");
            expect(agenda.turnos[0]?.estado).toBe("cancelado");
        });
    });


    //Test Tatamientos
    describe("Ciclo de Vida del Tratamiento", () => {
        it("debería cambiar de estado 'pendiente' a 'en_progreso'", () => {
            const t = new Tratamiento("t1", "Conducto", "Caries muy profundas", 20000);
            expect(t.estado).toBe("pendiente");
            
            t.avanzarEstado();
            expect(t.estado).toBe("en_progreso");
        });

        it("debería registrar la fecha de fin al completar un tratamiento", () => {
            const t = new Tratamiento("t1", "Conducto", "Caries muy profundas", 20000);
            t.avanzarEstado(); // a "en_progreso"
            t.avanzarEstado(); // a "completado"
            
            expect(t.estado).toBe("completado");
            expect(t.fechaFin).toBeInstanceOf(Date);
        });

        it("no debería permitir cancelar un tratamiento ya completado", () => {
            const t = new Tratamiento("t1", "Limpieza", "Mucho zarro acumulado", 50000);
            t.avanzarEstado(); // en_progreso
            t.avanzarEstado(); // completado
            
            expect(() => t.cancelar()).toThrow(/No se puede cancelar/);
        });

        it("debería lanzar error al buscar un tratamiento que no existe", () => {
            expect(() => paciente.fichaClinica.buscarTratamiento("id-fantasma")).toThrow(/No existe/);
        });
    });
    
});
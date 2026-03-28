import { test, describe, it, expect } from 'vitest';
import { Paciente } from '../src/index';

describe('Test para probar CI', () => {
    test('El testeo en CI anda', () => {
        expect(1 + 1).toBe(2);
    });
});

/*describe('Paciente', () => {
    it('Debe crear un paciente', () => {
        const paciente = new Paciente('Juan', 'Perez', '12345678', '12345678', );
    });
});*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.addPrefix = addPrefix;
exports.firstName = firstName;
function formatDate(fechaStr, dias) {
    const [year, month, day] = fechaStr.split('-').map(Number);
    const fecha = new Date(year, month - 1, day);
    fecha.setDate(fecha.getDate() + dias);
    const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ];
    const nuevoDia = fecha.getDate();
    const nuevoMes = meses[fecha.getMonth()];
    const nuevoAño = fecha.getFullYear();
    return `${nuevoDia} de ${nuevoMes} de ${nuevoAño}`;
}
function addPrefix(numero) {
    const numStr = numero.toString();
    if (numStr.length === 10) {
        return '57' + numStr;
    }
    return numStr;
}
function firstName(nombreCompleto) {
    const primerNombre = nombreCompleto.split(' ')[0];
    return primerNombre;
}
//# sourceMappingURL=orderHelpers.js.map
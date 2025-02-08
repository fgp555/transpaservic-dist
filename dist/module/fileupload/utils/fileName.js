"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartChars = getStartChars;
exports.generateTimestamp = generateTimestamp;
exports.sanitizeFileName = sanitizeFileName;
function getStartChars(filename) {
    const parts = filename.split('.');
    const namePart = parts[0];
    const lastFive = namePart.slice(0, 10);
    return lastFive + '.' + parts.slice(1).join('.');
}
function generateTimestamp() {
    return new Date()
        .toISOString()
        .replace(/[:.\-TZ]/g, '')
        .slice(2, -3);
}
function sanitizeFileName(filename) {
    return filename
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9_.-]/gi, '')
        .toLowerCase();
}
//# sourceMappingURL=fileName.js.map
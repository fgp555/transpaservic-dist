"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadFolder = getUploadFolder;
const fs = require("fs");
const path = require("path");
function getUploadFolder(moduleName = '') {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const uploadPath = path.join('./uploads', moduleName, yearMonth);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
}
//# sourceMappingURL=uploadPath.js.map
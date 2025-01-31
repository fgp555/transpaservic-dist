"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFileuploadDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fileupload_dto_1 = require("./create-fileupload.dto");
class UpdateFileuploadDto extends (0, mapped_types_1.PartialType)(create_fileupload_dto_1.CreateFileuploadDto) {
}
exports.UpdateFileuploadDto = UpdateFileuploadDto;
//# sourceMappingURL=update-fileupload.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMunicipalityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_municipality_dto_1 = require("./create-municipality.dto");
class UpdateMunicipalityDto extends (0, mapped_types_1.PartialType)(create_municipality_dto_1.CreateMunicipalityDto) {
}
exports.UpdateMunicipalityDto = UpdateMunicipalityDto;
//# sourceMappingURL=update-municipality.dto.js.map
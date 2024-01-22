"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 *  Get version
 *
 * @returns {string}
*/
function getVersion() {
    const pjson = JSON.parse(fs_1.default.readFileSync(`${__dirname}/../../package.json`, 'utf8'));
    return pjson.version;
}
exports.default = getVersion;
//# sourceMappingURL=getVersion.js.map
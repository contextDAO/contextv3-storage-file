"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageFile = exports.getVersion = void 0;
const fs_1 = require("fs");
const uuid_1 = require("uuid");
// Utils
const getVersion_1 = __importDefault(require("./utils/getVersion"));
exports.getVersion = getVersion_1.default;
/**
 * StorageFile Class
 * This class implements the Storage interface and provides fs based storage functionality.
 * Each document is stored with a unique ID, and can be retrieved or written to the storage.
 */
class StorageFile {
    /**
     * Constructor
     *
     * @param {Constructor} params
     */
    constructor(params) {
        this.pathCtx = params.pathCtx;
    }
    /**
     * Write data to a file in the filesystem.
     * @param data - The data to be stored.
     * @param prevDocId - The ID of the previous document, default is an empty string.
     * @param tags - Any tags associated with the document, default is an empty string.
     * @returns { docId, cost, kilobytes }
     * @throws Will throw an error if an error occurs
     */
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = 'file:' + (0, uuid_1.v4)();
            const filePath = `${this.pathCtx}/${newId}.json`;
            yield fs_1.promises.writeFile(filePath, JSON.stringify(data));
            return { docId: newId, cost: 0, kilobytes: 0 };
        });
    }
    /**
     * Read a document from the filesystem.
     * @param docId - The ID of the document to be retrieved.
     * @returns A promise that resolves to the requested document.
     * @throws Will throw an error if the document with the specified ID does not exist.
     */
    read(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = `${this.pathCtx}/${docId}.json`;
            try {
                const data = yield fs_1.promises.readFile(filePath, 'utf-8');
                return JSON.parse(data);
            }
            catch (err) {
                throw new Error(`Document with ID ${docId} does not exist`);
            }
        });
    }
}
exports.StorageFile = StorageFile;
//# sourceMappingURL=index.js.map
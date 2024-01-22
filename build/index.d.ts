import { Storage, Tag, Version, Constructor } from './types';
export { Version, Storage, Tag };
import getVersion from './utils/getVersion';
export { getVersion };
/**
 * StorageFile Class
 * This class implements the Storage interface and provides fs based storage functionality.
 * Each document is stored with a unique ID, and can be retrieved or written to the storage.
 */
export declare class StorageFile implements Storage {
    private pathCtx;
    /**
     * Constructor
     *
     * @param {Constructor} params
     */
    constructor(params?: Constructor);
    /**
     * Write data to a file in the filesystem.
     * @param data - The data to be stored.
     * @param prevDocId - The ID of the previous document, default is an empty string.
     * @param tags - Any tags associated with the document, default is an empty string.
     * @returns { docId, cost, kilobytes }
     * @throws Will throw an error if an error occurs
     */
    write(data: Version): Promise<{
        docId: string;
        cost: number;
        kilobytes: number;
    }>;
    /**
     * Read a document from the filesystem.
     * @param docId - The ID of the document to be retrieved.
     * @returns A promise that resolves to the requested document.
     * @throws Will throw an error if the document with the specified ID does not exist.
     */
    read(docId: string): Promise<Version>;
}

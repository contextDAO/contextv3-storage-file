import { Storage, Tag, Version, Constructor } from './types';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export { Version, Storage, Tag };

// Utils
import getVersion from './utils/getVersion';
export { getVersion };

/**
 * StorageFile Class
 * This class implements the Storage interface and provides fs based storage functionality.
 * Each document is stored with a unique ID, and can be retrieved or written to the storage.
 */
export class StorageFile implements Storage {

  private pathCtx: string;

  /**
   * Constructor
   * 
   * @param {Constructor} params 
   */
  constructor(params?: Constructor) {
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
  async write(data: Version): Promise<{
    docId: string;
    cost: number;
    kilobytes: number;      
  }> {
    const newId = 'file:' + uuidv4();
    const filePath = `${this.pathCtx}/${newId}.json`;
    await fs.writeFile(filePath, JSON.stringify(data));
    return { docId: newId, cost: 0, kilobytes: 0 };
  }

  /**
   * Read a document from the filesystem.
   * @param docId - The ID of the document to be retrieved.
   * @returns A promise that resolves to the requested document.
   * @throws Will throw an error if the document with the specified ID does not exist.
   */
  async read(docId: string): Promise<Version> {
    const filePath = `${this.pathCtx}/${docId}.json`;

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw new Error(`Document with ID ${docId} does not exist`);
    }
  }
}

/**
 * Actions Interface
 */
export type ActionType = 'write' | 'update' | 'push' | 'delete' | 'install';
export interface Action {
    action: ActionType;
    path?: string;
    data?: any;
}
export interface Version {
    actions: Action[];
    prevDocId: string;
    comments?: string;
    tags?: Tag[];
    format?: string;
    signature?: any;
}
/**
 * Tags
 */
export interface Tag {
    name: string;
    value: string;
}
/**
 * Network
 */
export type Network = 'mainnet' | 'testnet' | 'devnet';
/**
 * Constructor
 */
export interface Constructor {
    pathCtx: string;
}
/**
 * Storage Interface
 * Defines the contract for storage implementations.
 */
export interface Storage {
    /**
     * Writes data to the storage.
     * @param data - The data to be stored.
     * @param prevDocId - (Optional) The ID of the previous document.
     * @param tags - (Optional) Any tags associated with the document.
     * @returns { docId, cost, kilobytes }
     * @throws Will throw an error if an error occurs
     */
    write(data: Version): Promise<{
        docId: string;
        cost: number;
        kilobytes: number;
    }>;
    /**
     * Reads a document from the storage.
     * @param docId - The ID of the document to be retrieved.
     * @returns A promise that resolves to the requested document.
     * @throws Will throw an error if an error occurs
     */
    read(docId: string): Promise<Version>;
}

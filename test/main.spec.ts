import { StorageFile, Tag } from '../src/index';
import { Action, Version } from "../src/types";

describe("Main test", () => {
  let storage: StorageFile;
  let result: StorageFile | any;
  let id1: string;
  let id2: string;
  let id3: string;

  // Set tags
  const tags: Tag[] = [
    { name: "app", value: "ctx" },
    { name: "version", value: "mem:1.0.0:1.2.1" },
  ];
  
  beforeAll(async() => {
    storage = new StorageFile({pathCtx: './contextdata'});
  });
  
  test("1st Write", async () => {
    const action: Action = {
      action: 'write',
      data: { name: 'Bob', website: 'www.ctx.com', avatar: 'ctx' },
    }
    const version: Version = {
      actions: [action],
      prevDocId: '',
      comments: 'First version',
      tags,
    };
    const { docId } = await storage.write(version);
    id1 = docId;
  });
  
  test("2nd Write", async () => {
    const action: Action = {
      action: 'update',
      path: 'website',
      data: 'https://www.ctx.com',
    }
    const version: Version = {
      actions: [action],
      prevDocId: id1,
      comments: 'Update website version',
      tags,
    };

    const { docId } = await storage.write(version);
    id2 = docId;
  });
  
  test("3rd Write", async () => {
    const version: Version = {
      actions: [{ action: 'delete', path: 'avatar' }],
      prevDocId: id2,
      comments: 'Delete field avatar',
      tags,
    };

    const { docId } = await storage.write(version);
    id3 = docId;
    console.log(id1, id2, id3);
  });

  test("Read the last version", async () => {
    result = await storage.read(id3);
    expect(Object.keys(result.actions).length).toEqual(1);
    expect(result.actions[0].action).toEqual('delete');
    expect(result.actions[0].path).toEqual('avatar');
    expect(result.prevDocId).toEqual(id2);
    expect(result.tags.length).toEqual(2);
  });

  test("Read the previous version", async () => {
    result = await storage.read(id2);
    expect(Object.keys(result.actions).length).toEqual(1);
    expect(result.actions[0].action).toEqual('update');
    expect(result.actions[0].data).toEqual('https://www.ctx.com');
    expect(result.prevDocId).toEqual(id1);
  });

  test("Read the previous version", async () => {
    result = await storage.read(id1);
    expect(Object.keys(result.actions).length).toEqual(1);
    expect(result.actions[0].action).toEqual('write');
    expect(result.actions[0].data.website).toEqual('www.ctx.com');
    expect(result.actions[0].data.name).toEqual('Bob');
    expect(result.prevDocId).toEqual('');
  });

  test("Read a non existing version", async () => {
    try {
      await storage.read('mem:justmadeupid');
    } catch(e) {
      expect(e).toEqual(new Error('Document with ID mem:justmadeupid does not exist'));
    }
  });
});
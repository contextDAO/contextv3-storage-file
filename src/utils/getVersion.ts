import fs from 'fs';

/**
 *  Get version
 *
 * @returns {string}
*/

export default function getVersion(): string {
  const pjson = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`, 'utf8'));
  return pjson.version;
}
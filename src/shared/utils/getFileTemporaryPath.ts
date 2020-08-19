import path from 'path';

import uploadConfig from '@config/upload';

/**
 * @summary Returns the temporary path of a file
 *
 * @param {string} filename The file name
 */
const getFileTemporaryPath = (filename: string): string =>
  path.resolve(uploadConfig.tmpFolder, filename);

export default getFileTemporaryPath;

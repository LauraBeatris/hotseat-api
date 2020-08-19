import path from 'path';

import uploadConfig from '@config/upload';

/**
 * @summary Returns the upload path of a file
 *
 * @param {string} filename The file name
 */
const getFileUploadPath = (filename: string): string =>
  path.resolve(uploadConfig.uploadFolder, filename);

export default getFileUploadPath;

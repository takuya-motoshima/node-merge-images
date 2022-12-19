import path from 'path';
import im from 'imagemagick';
import {File} from 'nodejs-shared';
import MergeImagesOptions from '~/interfaces/MergeImagesOptions';

/**
 * Validate parameters.
 *
 * @param {string[]}                inputPaths          Path list of images to merge.
 * @param {string}                  outputPath          Output destination path for merged images.
 * @param {'vertical'|'horizontal'} options.direction   Direction of the merged image.
 * @param {string}                  options.background  The background color of the merged image.
 * @param {number}                  options.offset      Offset in pixels between each image.
 * @throws {TypeError}                                  Input path is not Array.
 * @throws {TypeError}                                  Input path is empty.
 * @throws {TypeError}                                  Output path is empty.
 * @throws {TypeError}                                  The direction option is not "vertical" or "horizontal".
 * @throws {TypeError}                                  Offset option is not greater than or equal to 0.
 * @throws {TypeError}                                  Input path file not found.
 */
function validateParameters(inputPaths: string[], outputPath: string, options: MergeImagesOptions): void {
  if (!Array.isArray(inputPaths))
    throw new TypeError('inputPaths must be an array that contains images');
  else if (inputPaths.length < 1)
    throw new TypeError('At least inputPaths must contain more than one image');
  else if (!outputPath)
    throw new TypeError('outputPath should be a file path');
  else if (!/^(vertical|horizontal)$/.test(options.direction!))
    throw new TypeError('The direction option should be "vertical" or "horizontal"');
  else if (options.offset! < 0)
    throw new TypeError('The offset option should be a number greater than or equal to 0');
  const missingInputPaths = inputPaths.filter(inputPath => !File.existsFile(inputPath));
  if (missingInputPaths.length > 0)
    throw new TypeError(`Input path ${missingInputPaths.join(', ')} not found`);
}

/**
 * Merge images.
 *
 * @param {string[]}                inputPaths          Path list of images to merge.
 * @param {string}                  outputPath          Output destination path for merged images.
 * @param {'vertical'|'horizontal'} options.direction?  Direction of the merged image. Default is vertical.
 * @param {string}                  options.background? The background color of the merged image.
 *                                                      This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification. 
 *                                                      For example, blue, #dddddff, rgb(255,255,255), etc.
 *                                                      Default is white.
 * @param {number}                  options.offset?     Offset in pixels between each image. Default is 0.
 * @throws {TypeError}                                  Input path is not Array.
 * @throws {TypeError}                                  Input path is empty.
 * @throws {TypeError}                                  Output path is empty.
 * @throws {TypeError}                                  The direction option is not "vertical" or "horizontal".
 * @throws {TypeError}                                  Offset option is not greater than or equal to 0.
 * @throws {TypeError}                                  Input path file not found.
 * @throws {Error}                                      Error executing convert command.
 * @return {Promise<void>}
 */
export default async (inputPaths: string[], outputPath: string, options: Partial<MergeImagesOptions> = {}): Promise<void> => {
  return new Promise((rslv, rej) => {
    try {
      options = Object.assign({
        direction: 'vertical',
        background: 'white',
        offset: 0,
      }, options);
      validateParameters(inputPaths, outputPath, options as Required<MergeImagesOptions>);
      const args = [];
      args.push('-background');
      args.push(options.background!);
      args.push('-size');
      args.push(options.direction === 'vertical' ? `x${options.offset}` : `${options.offset}x`);
      args.push(inputPaths[0]);
      for (let inputPath of inputPaths.slice(1)) {
        if (options.offset! > 0)
          args.push('xc:none');
        args.push(inputPath);
      }
      args.push(options.direction === 'vertical' ? '-append' : '+append');
      args.push(outputPath);
      File.makeDirectory(path.dirname(outputPath));
      im.convert(args, (err: any) => {
        if (err)
          return void rej(err);
        rslv();
      });
    } catch (err) {
      rej(err);
    }
  });
}
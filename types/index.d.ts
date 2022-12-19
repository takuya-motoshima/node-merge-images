import MergeImagesOptions from '~/interfaces/MergeImagesOptions';
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
declare const _default: (inputPaths: string[], outputPath: string, options?: Partial<MergeImagesOptions>) => Promise<void>;
export default _default;

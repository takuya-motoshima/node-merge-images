const fs = require('fs');
const {Media} = require('nodejs-shared');
const mergeImages = require('../dist/build.common');

const IMG_DIR = `${__dirname}/test-images`;
const RESULTS_DIR = `${__dirname}/results`;

/**
 * Calculate input image dimensions.
 */
function calcInputDimensions(inputPaths, options = {}) {
  options = Object.assign({offsetY: 0, offsetX: 0}, options);
  const calcResult = inputPaths.reduce((calcResult, inputPath) => {
    const {width, height} = Media.getDimensions(inputPath);
    calcResult.totalWidth += width;
    calcResult.totalHeight += height;
    if (width > calcResult.maxWidth)
      calcResult.maxWidth = width;
    if (height > calcResult.maxHeight)
      calcResult.maxHeight = height;
    return calcResult;
  }, {totalWidth: 0, totalHeight: 0, maxWidth: 0, maxHeight: 0});
  if (options.offsetY > 0)
    calcResult.totalHeight += (inputPaths.length - 1) * options.offsetY;
  if (options.offsetX > 0)
    calcResult.totalWidth += (inputPaths.length - 1) * options.offsetX;
  return calcResult;
}

beforeAll(() => {
  if (fs.existsSync(RESULTS_DIR))
    fs.rmSync(RESULTS_DIR, {recursive: true, force: true});
});

describe('Merge images', () => {
  test('Should be merged vertically.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/1.jpg`;
    await mergeImages(inputPaths, outputPath);
    const {height, width} = Media.getDimensions(outputPath);
    const {totalHeight: expectedHeight, maxWidth: expectedWidth} = calcInputDimensions(inputPaths);
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });

  test('If the direction option is "vertical", the merge should be vertical.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/2.jpg`;
    await mergeImages(inputPaths, outputPath, {direction: 'vertical'});
    const {height, width} = Media.getDimensions(outputPath);
    const {totalHeight: expectedHeight, maxWidth: expectedWidth} = calcInputDimensions(inputPaths);
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });

  test('Should merge horizontally.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/3.jpg`;
    await mergeImages(inputPaths, outputPath, {direction: 'horizontal'});
    const {height, width} = Media.getDimensions(outputPath);
    const {maxHeight: expectedHeight, totalWidth: expectedWidth} = calcInputDimensions(inputPaths);
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });

  test('Should merge vertically with 30px spacing.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/4.jpg`;
    const offset = 30;
    await mergeImages(inputPaths, outputPath, {offset, background: '#000'});
    const {height, width} = Media.getDimensions(outputPath);
    const {totalHeight: expectedHeight, maxWidth: expectedWidth} = calcInputDimensions(inputPaths, {offsetY: offset});
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });

  test('Should merge horizontally with 30px spacing.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/5.jpg`;
    const offset = 30;
    await mergeImages(inputPaths, outputPath, {direction: 'horizontal', offset, background: '#000'});
    const {height, width} = Media.getDimensions(outputPath);
    const {maxHeight: expectedHeight, totalWidth: expectedWidth} = calcInputDimensions(inputPaths, {offsetX: offset});
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });

  test('When vertically merging images of different sizes, the width should be adjusted to the image with the largest width.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/6.jpg`,];
    const outputPath = `${RESULTS_DIR}/6.jpg`;
    await mergeImages(inputPaths, outputPath, {background: '#000'});
    const {height, width} = Media.getDimensions(outputPath);
    const {totalHeight: expectedHeight, maxWidth: expectedWidth} = calcInputDimensions(inputPaths);
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });

  test('When horizontally merging images of different sizes, the height should be adjusted to the image with the largest height.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/5.jpg`,];
    const outputPath = `${RESULTS_DIR}/7.jpg`;
    await mergeImages(inputPaths, outputPath, {direction: 'horizontal', background: '#000'});
    const {height, width} = Media.getDimensions(outputPath);
    const {maxHeight: expectedHeight, totalWidth: expectedWidth} = calcInputDimensions(inputPaths);
    expect(
      fs.existsSync(outputPath)
      && height === expectedHeight
      && width === expectedWidth
    ).toBe(true);
  });
});
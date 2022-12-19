const mergeImages = require('../dist/build.common');

const IMG_DIR = `${__dirname}/test-images`;
const RESULTS_DIR = `${__dirname}/results`;

describe('Case of exception', () => {
  test('Should throw an error if the input path is not an Array.', async () => {
    const inputPaths = null;
    const outputPath = `${RESULTS_DIR}/0.jpg`;
    await expect(mergeImages(inputPaths, outputPath)).rejects.toThrow();
  });

  test('Should throw an error if the input path is an empty array.', async () => {
    const inputPaths = [];
    const outputPath = `${RESULTS_DIR}/0.jpg`;
    await expect(mergeImages(inputPaths, outputPath)).rejects.toThrow();
  });

  test('Should throw an error if the output path is empty.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = null;
    await expect(mergeImages(inputPaths, outputPath)).rejects.toThrow();
  });

  test('Should throw an error if the direction option is not "vertical" or "horizontal".', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/0.jpg`;
    const direction = 'hoge';
    await expect(mergeImages(inputPaths, outputPath, {direction})).rejects.toThrow();
  });

  test('Should throw an error if the offset option is not a number greater than or equal to 0.', async () => {
    const inputPaths = [`${IMG_DIR}/1.jpg`, `${IMG_DIR}/2.jpg`, `${IMG_DIR}/3.jpg`,];
    const outputPath = `${RESULTS_DIR}/0.jpg`;
    const offset = -1;
    await expect(mergeImages(inputPaths, outputPath, {offset})).rejects.toThrow();
  });
});
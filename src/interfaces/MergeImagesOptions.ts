export default interface MergeImagesOptions {
  /**
   * Direction of the merged image. Default is vertical.
   */
  direction: 'vertical'|'horizontal';

  /**
    * The background color of the merged image.
    * This option accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification. 
    * For example, blue, #dddddff, rgb(255,255,255), etc.
    * Default is white.
    */
  background: string;

  /**
    * Offset in pixels between each image. Default is 0.
    */
  offset: number;
}
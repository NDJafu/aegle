import type * as CSS from 'csstype';

interface QuarkDOM {
  style?: CSS.Properties;
  src?: string;
  [key: string]: string | QuarkDOM | StyleAttributes | undefined;
}

/**
 * This function generates DOM elements from a JSON object.
 *
 * A regular element
 *
 * @example ```js
 * import { quark } from 'quark.js'
 *
 * document.querySelector("#element").innerHTML = quark({
 *  "div": {
 *    "h1": "Hello world!",
 *  },
 * });
 * ```
 *
 *
 * @example ```js
 * const quarkImg = quark({
 *  "img#example": {
 *    src: "./example.png",
 *  },
 * });
 * ```
 * @param json The JSON object to parse as HTML
 * @returns The DOM element generated from the JSON object.
 */
declare function aegle(json: Record<string, QuarkDOM | string>): HTMLElement;

export { aegle };

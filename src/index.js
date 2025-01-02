/** @typedef {import('csstype').Properties} CSSProperties */

/**
 * Aegle DOM structure
 * @typedef {Object} AegleDOM
 * @property {CSSProperties} [style] Optional element inline styles.
 * @property {string} [src] The src attribute for img, audio or other media elements.
 * @property {Object<string, string | AegleDOM | CSSProperties | undefined>} key
 */

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
 * @param {Object<string, AegleDOM | string>} json The JSON object to parse as HTML
 * @returns {HTMLElement} The DOM element generated from the JSON object.
 */
export function aegle(json) {
  const parseKey = (key) => {
    const attributes = {};
    const regexAttr = /\[([^\]]+)=["']?([^\]"']+)["']?\]/g;
    const regexParts =
      /^(?<tag>[a-z]+\d?)?(?<id>#\w+)?(?<classes>(\.\w+|-\w+)*)?(?<attrs>(\[.*\])*)$/i;

    const match = key.match(regexParts);

    if (!match) {
      throw new Error(`Invalid element format: ${key}`);
    }

    const { tag, id, classes, attrs } = match.groups;

    if (id) {
      attributes.id = id.slice(1);
    }

    if (classes) {
      attributes.class = classes.replace(/\./g, ' ').trim();
    }

    if (attrs) {
      const attrMatch = regexAttr.exec(attrs);
      while (attrMatch !== null) {
        const [, attr, value] = attrMatch;
        attributes[attr] = value;
      }
    }

    return { tag, attributes };
  };

  const createElement = (key, value) => {
    const { tag = 'div', attributes } = parseKey(key);
    const element = document.createElement(tag);

    for (const [attr, val] of Object.entries(attributes)) {
      element.setAttribute(attr, val.trim());
    }

    if (typeof value === 'string') {
      element.textContent = value;
    } else if (typeof value === 'object') {
      if (value.style) {
        Object.assign(element.style, value.style);
      }

      if (value.src && ['img', 'audio'].includes(tag)) {
        element.src = value.src;
      }

      for (const [childKey, childValue] of Object.entries(value)) {
        if (!['style', 'src'].includes(childKey)) {
          element.appendChild(createElement(childKey, childValue));
        }
      }
    }
    return element;
  };

  const [rootKey, rootValue] = Object.entries(json)[0];
  return createElement(rootKey, rootValue);
}

import type * as CSS from 'csstype';

interface AegleDOM {
  style?: CSS.Properties;
  src?: string;
  [key: string]: string | AegleDOM | CSS.Properties | undefined;
}

/**
 * This function generates DOM elements from a JSON object.
 *
 * A regular element
 *
 * @example ```js
 * import { aegle } from 'aegle-js'
 *
 * document.querySelector("#element").innerHTML = aegle({
 *  "div": {
 *    "h1": "Hello world!",
 *  },
 * });
 * ```
 *
 *
 * @example ```js
 * const aegleImg = aegle({
 *  "img#example": {
 *    src: "./example.png",
 *  },
 * });
 * ```
 * @param json The JSON object to parse as HTML
 * @returns The DOM element generated from the JSON object.
 */
export function aegle(json: Record<string, AegleDOM | string>): HTMLElement {
  const parseKey = (key: string) => {
    const attributes: Record<string, string> = {};
    const regexAttr = /\[([^\]]+)=["']?([^\]"']+)["']?\]/g;
    const regexParts =
      /^(?<tag>[a-z]+\d?)?(?<id>#\w+)?(?<classes>(\.\w+|-\w+)*)?(?<attrs>(\[.*\])*)$/i;

    const match = key.match(regexParts);

    if (!match) {
      throw new Error(`Invalid element format: ${key}`);
    }

    const { tag, id, classes, attrs } = match.groups ?? {};

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

  const createElement = (
    key: string,
    value: string | AegleDOM,
  ): HTMLElement => {
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

      if (value.src && element instanceof HTMLMediaElement) {
        element.src = value.src;
      }

      for (const [childKey, childValue] of Object.entries(value)) {
        if (!['style', 'src'].includes(childKey)) {
          element.appendChild(
            createElement(childKey, childValue as typeof value),
          );
        }
      }
    }
    return element;
  };

  const [rootKey, rootValue] = Object.entries(json)[0];
  return createElement(rootKey, rootValue);
}

/**
 * This function generates DOM elements from a JSON object.
 *
 * @example
 *
 * A regular element:
 *
 * ```js
 * import { aegle } from 'aegle-js'
 *
 * document.querySelector("#element").innerHTML = aegle({
 *  "div": {
 *    "h1": "Hello world!",
 *  },
 * });
 * ```
 *
 * An image element:
 *
 * ```js
 * const aegleImg = aegle({
 *  "img#example": {
 *    src: "./example.png",
 *  },
 * });
 * ```
 * @param json The JSON object to parse as HTML
 * @returns The DOM element generated from the JSON object.
 */
export function aegle(json: object): HTMLElement {
  function getTagAndAttributes(key: string) {
    const attributes: Record<string, string> = {};
    const regexAttr = /\[([^\]]+)=["']?([^\]"']+)["']?\]/g;
    const regexParts =
      /^(?<tag>[a-z]+\d?)?(?<id>#\w+)?(?<classes>(\.\w+|-\w+)*)?(?<attrs>(\[.*\])*)$/i;

    const match = key.match(regexParts);

    const { tag, classes, id, attrs } = match?.groups ?? {};

    if (id) {
      attributes.id = id.slice(1);
    }

    if (classes) {
      const classNames = classes.replace(/\./g, ' ').trim();
      attributes.class = classNames;
    }

    let attrMatch = regexAttr.exec(attrs);
    while (attrMatch !== null) {
      const [, attr, value] = attrMatch;
      attributes[attr] = value;
      attrMatch = regexAttr.exec(attrs);
    }

    return { tag, attributes };
  }

  function createElement(parent: string, children: object | string) {
    const { tag, attributes } = getTagAndAttributes(parent);
    const element = document.createElement(tag);

    for (const [attribute, value] of Object.entries(attributes)) {
      element.setAttribute(attribute, value);
    }

    if (typeof children === 'string') {
      element.textContent = children;
    } else if (typeof children === 'object') {
      if ('src' in children && typeof children.src === 'string') {
        element.setAttribute('src', children.src);
      }

      for (const [childKey, childValue] of Object.entries(children)) {
        if (!['src'].includes(childKey)) {
          element.appendChild(createElement(childKey, childValue));
        }
      }
    }

    return element;
  }

  const [rootKey, rootValue] = Object.entries(json)[0];
  return createElement(rootKey, rootValue);
}

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

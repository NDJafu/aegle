import { describe, expect, test } from 'vitest';
import { aegle } from '../src/index.ts';

describe('Create components', () => {
  test('create simple component', () => {
    const node = aegle({
      div: 'Hi!',
    });

    const expectedNode = document.createElement('div');
    expectedNode.innerHTML = 'Hi!';

    expect(node.outerHTML).toBe(expectedNode.outerHTML);
  });

  test("undefined on keys' value are replaced not shown", () => {
    const node = aegle({ a: undefined });

    expect(node.innerHTML).toBe('');
  });

  test('nesting elements', () => {
    const node = aegle({
      div: { div: 'Hi!' },
    });

    const expectedNode = document.createElement('div');
    const childNode = document.createElement('div');
    childNode.innerHTML = 'Hi!';
    expectedNode.appendChild(childNode);

    expect(node.outerHTML).toBe(expectedNode.outerHTML);
  });

  test('big element', () => {
    const node = aegle({
      div: {
        "a[href='https://vite.dev'][target='_blank']": {
          "img.logo[src='https://placehold.co/240x240'][alt='Vite logo']": {
            src: '',
          },
        },
        "a[href='https://www.typescriptlang.org'][target='_blank']": {
          "img.logo.vanilla[src='https://placehold.co/240x240'][alt='Typescript logo']":
            {
              src: '',
            },
        },
        h1: 'Vite + Typescript',
        'div.card': {
          "button#counter[type='button']": undefined,
        },
        'p.read-the-docs':
          'Click on the Vite and Typescript logos to learn more',
      },
    });

    const expectedNode = node.outerHTML;

    expect(node.outerHTML).toBe(expectedNode);
  });

  test('img element', () => {
    const node = aegle({
      img: {
        src: 'https://placehold.co/40x40',
      },
    });

    const expected = document.createElement('img');
    expected.src = 'https://placehold.co/40x40';

    expect(node).toStrictEqual(expected);
  });
});

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
        'div.hello': 'Hi!',
        'div.logo': 'Hello!',
        'div.with-child': {
          'div.child1': 'Good morning!',
          'div.child2': 'Good night.',
        },
      },
    });

    const expectedNode =
      '<div><div class="hello">Hi!</div><div class="logo">Hello!</div><div class="with-child"><div class="child1">Good morning!</div><div class="child2">Good night.</div></div></div>';

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

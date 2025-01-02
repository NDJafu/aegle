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
    const node = aegle({
      div: undefined,
    });

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
});

import {examplify} from './examplify.js';

test('augments text with html version of block delimited content', () => {
    expect(examplify("```!html\n<p>hello</p>\n```")).toBe("```html\n<p>hello</p>\n```\n<p>hello</p>\n");
});
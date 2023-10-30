import {examplify} from './examplify.js';
import {JSDOM} from 'jsdom';

const { document } = (new JSDOM(`...`)).window;

test('augments text with html version of block delimited content', () => {
    expect(examplify("```!html\n<p>hello</p>\n```")).toBe("```html\n<p>hello</p>\n```\n<p>hello</p>\n");
});

test('augments html with html version of block delimited content', () => {
    const div = document.createElement("div"),
        html = div.innerHTML = "<" + 'code class="language-!html" data-highlighted="yes"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n' + "<" + "/code>";;
    examplify(div);
    expect(div.innerHTML).toBe(html.replace("!html","html")+"<div><span>hello</span></div>\n");
})

test('throws error if input is not string or no support of querySelectorAll', () => {
    expect(() => examplify(1)).toThrowError(TypeError);
})
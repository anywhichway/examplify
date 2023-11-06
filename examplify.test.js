import {examplify} from './examplify.js';
import {JSDOM} from 'jsdom';

const { document } = (new JSDOM(`...`)).window;

globalThis.document = document;

test('augments text with html version of block delimited content', () => {
    expect(examplify("```!html\n<p>hello</p>\n```")).toBe("```html\n<p>hello</p>\n```\n<p>hello</p>\n");
});

test('augments text with javascript version of block delimited content', () => {
    expect(examplify("```!javascript\nconsole.log('Hello, World!')\n```")).toBe("```javascript\nconsole.log('Hello, World!')\n```\n<script>\nconsole.log('Hello, World!')\n</script>");
});

test('augments text with html version of multiple block delimited content', () => {
    expect(examplify("```!html\n<p>hello</p>\n```\n```!html\n<p>hello</p>\n```")).toBe("```html\n<p>hello</p>\n```\n<p>hello</p>\n\n```html\n<p>hello</p>\n```\n<p>hello</p>\n");
});

test('augments html with html version of block delimited content', () => {
    const div = document.createElement("div"),
        html = div.innerHTML = "<" + 'code class="language-!html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n' + "<" + "/code>";;
    examplify(div);
    expect(div.innerHTML).toBe(html.replace("!html","html")+"<div><span>hello</span></div>\n");
})

test('augments html containing script with html version of block delimited content', () => {
    const div = document.createElement("div"),
        html = div.innerHTML = `<code class="language-!html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"ok"</span>)
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code>`
    examplify(div);
    expect(div.innerHTML).toBe(`<code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"ok"</span>)
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><script>
    console.log("ok")
    </script>\n`);
})

test('augments html containing script with html version of block delimited content', () => {
    const div = document.createElement("div"),
        html = div.innerHTML = `<pre><code class="language-!javascript">console.log(&quot;ok!&quot;)</code></pre>`
    examplify(div);
    expect(div.innerHTML).toBe(`<pre><code class="language-javascript">console.log("ok!")</code>\n<script>console.log("ok!")</script></pre>`);
})

test('throws error if input is not string or no support of querySelectorAll', () => {
    expect(() => examplify(1)).toThrowError(TypeError);
})
# examplify

Amplify your Markdown documentation with executable examples.

## Introduction

`examplify` allows you to write Markdown documentation with executable examples.

It helps you to ensure that your examples are always in sync with executable JavaScript or
presentable HTML output. You can do less work and deliver more.

If you like `examplify`, check out `lazui` at [lazui.org](https://lazui.org/lazui.md#examplify-and-showsource) for activating
your Markdown files. Almost all the example code on lazui.org uses `examplify`, plus there are 
a lot of other goodies.

## Installation

### Local

```bash
npm install -g examplify
```

And use the file `examplify.js` in your project.

### CDN

```html
<script src="https://esm.sh/examplify"></script>
```

## Usage

### Before Markdown Parsing

Prior to handing a string to a Markdown parser, pass it through `examplify`. Any code blocks
marked as `!html` will be processed and the internals inserted immediately after the code block.

```
import { examplify } from 'examplify';
import {default as MarkdownIt} from "markdown-it";

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false
})

const string = "```!html\n<script>console.log('Hello, World!');</script>\n```";

const examplified = examplify(string);

const markedDown = md.render(examplified);
```

This Markdown:

```markdown
    ```!html
    <script>console.log('Hello, World!');</script>;
    ```
```


Will be turned into this:

```markdown
    ```html
    <script>console.log('Hello, World!');</script>;
    ```
    <script>console.log('Hello, World!')</script>;
```

And this Markdown:

```markdown
    ```!html
    <form><input type="text" value="Hello, World!"></form>
    ```
```

Will be turned into this:

```markdown
    ```html
    <form><input type="text" value="Hello, World!"></form>
    ```
    <form><input type="text" value="Hello, World!"></form>
```

Will actually render as a form with an input field after the Markdown.

`!javascript` is also supported.

```markdown
    ```!javascript
    console.log('Hello, World!');
    ```
```

Will produce the following HTML:

```markdown
    ```javascript
    console.log('Hello, World!');
    ```
    <script>console.log('Hello, World!');</script>
```


*Note*: The script tags generated do not have a type. If you need a `module`, provide the example as `!html` with the
module script as source.

You can even spice things up by updating the final DOM with your JavaScript:

```markdown
    <div id="message">
    ```!javascript
        const el = document.getElementById('message');
        el.innerHTML = 'Hello, World!';
    ```
```

### After Markdown Parsing

`examplify` will also process code blocks marked as `!html` and `!javascript` after the Markdown has been parsed.

You can use this in a browser if your server does not support `examplify`.

Pass a `document` object or any `HTMLElement` to `examplify`. All code blocks matching `code[class*='language-!html']`
will be processed. The internals will be inserted immediately after the code block as HTML and the class will be changed to
`language-html`. Any `<script>` elements will be executed, so make sure you are loading the Markdown from a trusted source.

```
import { examplify } from 'examplify';

examplify(document);
```

This Markdown:

```markdown
    ```!html
    <script>console.log('Hello, World!');</script>;
    ```
```


Will generate this HTML:

```html
<code class="language-!html">
    <span class="hljs-tag">
        &lt;<span class="hljs-name">script</span>&gt;
    </span>
    <span class="language-javascript">
        <span class="hljs-variable language_">console</span>.
        <span class="hljs-title function_">log</span>
        (<span class="hljs-string">"Hello, World!"</span>)
    </span>
    <span class="hljs-tag">&lt;/
        <span class="hljs-name">script</span>&gt;
    </span>
</code>
```

Which will be converted to this:

```html
<code class="language-html">
    <span class="hljs-tag">
        &lt;<span class="hljs-name">script</span>&gt;
    </span>
    <span class="language-javascript">
        <span class="hljs-variable language_">console</span>.
        <span class="hljs-title function_">log</span>
        (<span class="hljs-string">"Hello, World!"</span>)
    </span>
    <span class="hljs-tag">&lt;/
        <span class="hljs-name">script</span>&gt;
    </span>
</code>
<script>console.log('Hello, World!');</script>
```


## License

MIT

# Release History (reverse chronological order)

2024-04-31 v1.0.12 Addressed bug with SCRIPT tags in PRE tags

2024-04-30 v1.0.11 More work on PRE

2024-04-30 v1.0.10 Added support for code blocks being inside a PRE tag and elevating the example outside the PRE

2023-11-06 v1.0.8-9 Documentation updates.

2023-11-06 v1.0.7 Sync npm and GitHub versions

2023-11-06 v1.0.6 Fixing README so npmjs.com will render it properly, even though GitHub already does. Added a unit test
for !javascript. Updated docs.

2023-11-01 v1.0.5 More README formatting to handle GitHub nuances.

2023-11-01 v1.0.4 Fixed README formatting

2023-10-31 v1.0.3 Ensured script elements are executing when examplify applied to DOM node.

2023-10-30 v1.0.2 Fixed bug related to two tags blocks in sequence.

2023-10-30 v1.0.1 Adjusted DOM processing to return the passed in element.

2023-10-30 v1.0.0 Added support for post-processing of Markdown.

2023-10-29 v0.0.1 Initial Release.

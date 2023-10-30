# examplify

Amplify your Markdown documentation with executable examples.

## Introduction

`examplify` allows you to write Markdown documentation with executable examples.

It helps you to ensure that your examples are always in sync with executable JavaScript or
presentable HTML output.

If you like `examplify`, check out `lazui` at [lazui.org](https://lazui.org) for activating
your Markdown files.

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

This Markdown:

```markdown
&grave;&grave;&grave;!html
&lt;script&gt;console.log('Hello, World!');&lt;/script&gt;
&grave;&grave;&grave;
```

Will be turned into this:

```markdown
&grave;&grave;&grave;html
&lt;script&gt;console.log('Hello, World!');&lt;/script&gt;
&grave;&grave;&grave;
&lt;script&gt;console.log('Hello, World!');&lt;/script&gt;
```

And this Markdown:

```markdown
&grave;&grave;&grave;!html
&lt;form&gt;&lt;input type="text" value="Hello, World!"&gt;&lt;/form&gt;
&grave;&grave;&grave;
```

Will actually render as this:

```markdown
&grave;&grave;&grave;html
&lt;form&gt;&lt;input type="text" value="Hello, World!"&gt;&lt;/form&gt;
&grave;&grave;&grave;
```
<form><input type="text" value="Hello, World!"></form>

Prior to handing a string to a Markdown parser, pass it through `examplify`. Any code blocks
marked as `!html` will be processed and the internals insefted immediately after the code block.

```
import { examplify } from 'examplify';

const string = "```!html\n<script>console.log('Hello, World!');</script>\n```";

const examplified = examplify(string);

console.log(examplified);
// => "```html\n<script>console.log('Hello, World!');</script>\n```\n<script>console.log('Hello, World!');</script>"
```

## License

MIT

# Release History (reverse chronological order)

2021-10-19 v0.0.1 Initial Release.

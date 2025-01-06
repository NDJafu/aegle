<div align='center'>
  <h1>Aegle</h1>

  <p>The minimalistic Javascript UI library to create reusable elements from json or javascript objects.</p>

  ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ndjafu/aegle/main-ci.yaml?color=542bb0) ![NPM Version](https://img.shields.io/npm/v/aegle-js?color=3a3cab) ![Static Badge](https://img.shields.io/badge/MIT-9a71b7?label=license) ![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/aegle-js?color=8d75c9)

  [Installation](#installation) • [Examples](#examples) • [FAQ](#faq)
</div>

### Why aegle?

It's a solution I came up with while i was doing a static html with a lot repeating parts but with a lot of `document.createElement()` and I wanted a better way to write bigger components without that jankyness or sacrificing readability so I combined the syntax of [Emmet](https://www.emmet.io/) and object nesting to create this library to simplify the process with a small payload size.

### Installation

Using Aegle with Vite or any other front-end bundler:
```bash
npm install aegle-js
# Or yarn
yarn add aegle-js
# Or pnpm
pnpm install aegle-js
```

Using Aegle on the browser:

```html
<!-- Import the package from any CDN you'd like -->
<script src="https://unpkg.com/aegle-js@0.0.10-alpha/dist/umd/index.min.js"></script>
<script>
  const { aegle } = Aegle;
</script>
```

### Usage

Just import the `aegle` function and start writing. The returned element is a DOM so you can just manipulate it using DOM specific functions like how you would do to a `document.createElement()`

```js
import { aegle } from "aegle-js"
```


Due to how the library parses the object key, there's a strict order in how to write the key for an element:

1. **tag** (eg. div) 
2. **id** (eg. #container)
3. **classes** (eg. .flex, .any-name-you-like)
4. **attributes** (eg. [href='/index.html'])

> Class-chaining is possible, check [examples](#examples) 

### Examples

Simple component:
```js
const element = aegle({
  div: "Hi!"
});
```

Nested component
```js
const nested = aegle({
  "div.container": {
    "h1.title": "This is a title.",
    "p.description": "Description for this component?",
  },
});
```

Component with full attributes and chaining classes
```js
const full = aegle({
  "div#container.flex.gap-2.items-center[style='background: black;']": "This is content.",
});
```

Media component
```js
import image from "./image.png"

const img = aegle({
  "img[alt='imported image']": {
    src: image
  },
});

// This works for audio or video too
const medias = aegle({
  "video[width='640'][height='360']": {
    src: "insert video src",
  },
  "audio[controls]": {
    src: "insert audio src",
  },
});
```

### FAQ

Q: What other features this library plan to add in the future?
>A: idk, give me suggestions.

Q: How do I add events listener?
>A: just use `element.addEventListener()` on the returned element.

Q: Why didn't you make dynamic inline styles?
>A: Same reason why couldn't you just use `element.styles.anyCSSProperty` like a normal person would instead of relying on a library to reinvent how to write css dynamically.





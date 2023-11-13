# `mailtyphoon`

Originally a fork of [mailwind](https://github.com/soheilpro/mailwind), `mailtyphoon` is a simple tool to compile HTML emails from [Tailwind CSS](https://tailwindcss.com/) classes, or any other CSS/SCSS/SASS file.

## Installation

For global usage:

```bash
npm install -g mailtyphoon
```

## Usage

As a command line tool:

```bash
mailtyphoon --help
```

Or as a library:

```js
import { compileString } from "mailtyphoon";

const inputHtml = ...;
const inputCss = ...;

const { html, css } = await compileString(inputHtml, {
    css: inputCss,
});
```

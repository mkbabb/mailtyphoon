# `mailtyphoon` 🌪️

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

```ts
import { compileString } from "mailtyphoon";

const inputHtml = ...;
const inputCss = ...;

const { html, css } = await compileString(inputHtml, {
    css: inputCss,
});
```

## About

Creating mail-compatible HTML is overtly tedious and error prone: you can't use outside stylesheets, each email client renders CSS differently, and you have to use inline styles for everything. `mailtyphoon` aims to make this process easier by allowing you to write your emails using [Tailwind CSS](https://tailwindcss.com/) classes, or any other CSS/SCSS/SASS file, and then compiling them to HTML with all the styles inlined. Inlining is done by way of [Juice](https://github.com/Automattic/juice)
and [rehype](https://github.com/rehypejs/rehype).

Important to note: pseudo-classes and pseudo-elements are supported, but these aren't inlined.

The pipeline of `mailtyphoon` is as follows:

-   Process the input HTML and CSS files
    -   If the input CSS file is SASSy, compile it to CSS
-   Call `tailwindcss` to process the CSS file and generate the appurtenant stylesheet
-   Call `juice` to inline the generated stylesheet into the HTML file.
    -   Use `rehype` to parse the HTM
    -   Herein we resolve any CSS variables, and replace any Tailwind CSS classes with their corresponding styles
-   Return the resulting HTML and CSS 🎉

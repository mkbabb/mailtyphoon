import { mailtyphoonCss } from "../src/mailtyphoon";
import { describe, it, assert } from "vitest";
// import fs to read a file:
import fs from "fs";

describe("windy", () => {
    it("should inline css", async () => {
        const inputHtmlPath = fs.readFileSync("./data/email.html", "utf-8");
        const inputCssPath = fs.readFileSync("./data/email.scss", "utf-8");

        const outputHtmlPath = "./data/out.html";
        const outputCssPath = "./data/out.css";

        const output = await mailtyphoonCss(inputHtmlPath, {
            // css: inputCssPath,
        });

        if (output == null) {
            assert.fail("Failed to generate output. Check the console for errors.");
            return;
        }

        const { html, css } = output;

        fs.writeFileSync(outputHtmlPath, html);
        fs.writeFileSync(outputCssPath, css);

        assert.ok(true);
    });
});

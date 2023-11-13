import fs from "fs";
import { assert, describe, it } from "vitest";
import { compileString } from "../src/mailtyphoon";

describe("windy", () => {
    it("should inline css", async () => {
        const inputHtml = fs.readFileSync("./data/email.html", "utf-8");
        const inputCss = fs.readFileSync("./data/email.scss", "utf-8");

        const outputHtmlPath = "./data/out.html";
        const outputCssPath = "./data/out.css";

        const output = await compileString(inputHtml, {
            css: inputCss,
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

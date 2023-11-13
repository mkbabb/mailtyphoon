import crypto from "crypto";
import fs from "fs";
import { LRUCache } from "lru-cache";
import path from "path";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { compileString, Options } from "./mailtyphoon";
import { TAILWIND_CONFIG_PATH } from "./utils";

const cwd = process.cwd();

const cache = new LRUCache<string, string>({ max: 100 });

const y = yargs(hideBin(process.argv))
    .option("input-html", {
        alias: "i",
        describe: "The path to your input HTML file",
        type: "string",
        default: path.resolve(cwd, "./email.html"),
        demandOption: true,
    })
    .option("output-html", {
        alias: "o",
        describe: "The path to the inlined HTML file that will be generated",
        type: "string",
        default: path.resolve(cwd, "./out.html"),
        demandOption: true,
    })
    .option("input-css", {
        alias: "c",
        type: "string",
        describe: "The path to your custom CSS or SASS file",
    })
    .option("output-css", {
        type: "string",
        describe: "The path to the CSS file that will be generated",
    })
    .option("tailwind-config", {
        type: "string",
        describe: "The path to your custom Tailwind config file",
        default: TAILWIND_CONFIG_PATH,
    })
    .option("reset", {
        type: "string",
        describe: "Set to `false` to disable extended resets",
        default: false,
    })
    .option("watch", {
        alias: "w",
        type: "boolean",
        describe: "Watch for changes in the input HTML or CSS file",
        default: false,
    });

const getFileHash = (filePath: string): string => {
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "";
    return crypto.createHash("sha256").update(content).digest("hex");
};

const watchFile = (filePath: string, callback: () => void): void => {
    fs.watchFile(filePath, { interval: 500 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            callback();
        }
    });
};

const main = async (): Promise<void> => {
    const argv = await y.argv;
    const inputHtmlPath = argv["input-html"];
    const outputHtmlPath = argv["output-html"];
    const inputCssPath = argv["input-css"];
    const outputCssPath = argv["output-css"];
    const tailwindConfigPath = argv["tailwind-config"];
    const reset = argv["reset"];

    const processFile = async (): Promise<void> => {
        const inputHtmlHash = getFileHash(inputHtmlPath);
        const inputCssHash = getFileHash(inputCssPath ?? "");

        const combinedHash = inputHtmlHash + inputCssHash;

        const cachedOutput = cache.get(combinedHash);
        if (cachedOutput) {
            fs.writeFileSync(outputHtmlPath, cachedOutput);
            return;
        }

        const inputHtml = fs.readFileSync(inputHtmlPath, "utf-8");
        const options: Options = {
            css:
                inputCssPath != null
                    ? fs.readFileSync(inputCssPath, "utf-8")
                    : undefined,
            tailwindConfigPath,
            reset: reset !== "false",
        };

        const output = await compileString(inputHtml, options);
        if (output == null) {
            console.log("Failed to generate output.");
            process.exit(1);
        }

        const { html, css } = output;
        if (outputHtmlPath != null) {
            fs.writeFileSync(outputHtmlPath, html);
        }
        if (outputCssPath != null) {
            fs.writeFileSync(outputCssPath, css);
        }

        cache.set(combinedHash, html);
    };

    await processFile();

    if (argv.watch) {
        watchFile(inputHtmlPath, processFile);

        if (inputCssPath != null) {
            watchFile(inputCssPath, processFile);
        }
    }
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

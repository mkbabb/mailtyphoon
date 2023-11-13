interface Options {
    /** A path to your tailwind.css file, optimized for email */
    tailwindConfigPath?: string;
    /** The base px value for 1rem, defaults to 16px */
    basePx?: number;
    /** Set to `false` to disable extended resets */
    reset?: boolean;
    /** Custom CSS to be injected */
    css?: string;
}
declare const mailtyphoonCss: (inputHtml: string, options: Options) => Promise<{
    html: string;
    css: string;
} | undefined>;
export { Options, mailtyphoonCss };

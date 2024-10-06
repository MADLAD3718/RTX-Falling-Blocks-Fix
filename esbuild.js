const esbuild = require("esbuild");

const external = [
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-gametest",
    "@minecraft/server-net",
    "@minecraft/server-common",
    "@minecraft/server-editor",
    "@minecraft/debug-utilities",
];

esbuild
    .build({
        entryPoints: ["src/main.js"],
        outfile: "behaviours/scripts/main.js",
        bundle: true,
        format: "esm",
        external,
    })
    .then(() => {
        console.log("Bundling completed!");
    })
    .catch((error) => {
        console.error(error);
    });
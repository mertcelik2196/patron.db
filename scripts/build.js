const { sync: rimraf } = require("rimraf");
const path = require("path");

const start = async () => {
    const startTime = Date.now();
    const buildDir = path.resolve(__dirname, "..", "dist");
    rimraf(buildDir);
}

start();
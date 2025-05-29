// scripts/copy-query-engine.js
import fs from 'fs';
import path from 'node:path';
import * as os from 'node:os';
// Source location of the query engine binary
let filename;

switch (os.platform()) {
    case "darwin":
        filename = "libquery_engine-darwin-arm64.dylib.node";
        break;
    case "linux":
        filename = "libquery_engine-rhel-openssl-3.0.x.so.node";
        break;
    default:
        throw new Error(`Unsupported version: ${os.version()}`);
}

const sourcePath = path.resolve(
    `${process.cwd()}/node_modules/@prisma/engines/${filename}`
);

// Destination (adjust if needed)
const destDir = path.resolve(`${process.cwd()}/lib/generated/prisma`);
const destPath = path.join(destDir, filename);

// Ensure the destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {recursive: true});
}

// Copy the binary
fs.copyFileSync(sourcePath, destPath);

console.log(`✅ Copied Prisma query engine to: ${destPath}`);
// scripts/copy-query-engine.js
import fs from 'fs';
import path from 'node:path';
// Source location of the query engine binary
const sourcePath = path.resolve(
    'node_modules/@prisma/engines/libquery_engine-rhel-openssl-3.0.x.so.node'
);

// Destination (adjust if needed)
const destDir = path.resolve(`${process.cwd()}/lib/generated/prisma`);
const destPath = path.join(destDir, 'libquery_engine-rhel-openssl-3.0.x.so.node');

// Ensure the destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy the binary
fs.copyFileSync(sourcePath, destPath);

console.log(`✅ Copied Prisma query engine to: ${destPath}`);
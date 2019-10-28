import crypto from "crypto";
import fs from "fs-extra";
import os from "os";
import path from "path";

const isUndefined = (v: any) => typeof v === "undefined";

export const tempDir = fs.realpathSync(os.tmpdir());

export function rndString(len = 10) {
    return crypto.randomBytes(len).toString("hex");
}

export function tempPath({
    parent,
    base,
    name,
}: any = {}) {

    parent = parent || tempDir;
    name = name || rndString();
    base = isUndefined(base)
        ? rndString()
        : base;

    return path.join(parent, base, name);
}

import { tempPath } from "../utils";
import { FileWriteOptions } from "./Base";
import { FileAsync } from "./FileAsync";
import { FileSync } from "./FileSync";

export * from "./Base";
export * from "./FileSync";
export * from "./FileAsync";

/**
 * Creates a temporary file with custom options
 */
export async function file(content: any = "", options: FileWriteOptions = {}) {
    const f = new FileAsync({
        filepath: tempPath(options),
        options,
    });
    await f.init(content);
    return f;
}

/**
 * Creates a temporary file with custom options in sync mode
 */
export function fileSync(content: any = "", options: FileWriteOptions = {}) {
    return new FileSync({
        content,
        filepath: tempPath(options),
        options,
    });
}

import { FileWriteOptions } from "../File";
import { tempPath } from "../utils";
import { JsonAsync } from "./JsonAsync";
import { JsonSync } from "./JsonSync";

export interface JsonFileOptions extends FileWriteOptions {
    replacer?: (this: any, key: string, value: any) => any;
    spaces?: string | number;
}

export * from "./JsonAsync";
export * from "./JsonSync";

/**
 * Creates a temporary JSON file with custom options in async mode
 * @param content Optional file content
 * @param options Optional file write options
 */
export async function jsonAsync(content: any = "", options: JsonFileOptions = {}) {
    const f = new JsonAsync({
        filepath: tempPath(options),
        options,
    });
    await f.init(content);
    return f;
}

/**
 * Creates a temporary JSON file with custom options in sync mode
 * @param content Optional file content
 * @param options Optional file write options
 */
export function jsonSync(content: any = "", options: JsonFileOptions = {}) {
    return new JsonSync({
        content,
        filepath: tempPath(options),
        options,
    });
}

import {tempPath} from "../utils";
import {FileAsync} from "./FileAsync";
import {FileSync} from "./FileSync";

interface WriteOptions {
    encoding?: string | null;
    mode?: string | number;
    flag?: string;
}

interface FileWriteOptions extends WriteOptions {
    name?: string;
    base?: string;
    parent?: string;
}

export * from "./FileSync";
export * from "./FileAsync";

/**
 * Creates a temporary file with custom options
 * @param content Optional file content
 * @param options Optional file write options
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
 * @param content Optional file content
 * @param options Optional file write options
 */
export function fileSync(content: any = "", options: FileWriteOptions = {}) {
    const {name, base, parent} = options;
    return new FileSync({
        content,
        filepath: tempPath(options),
        options,
    });
}

import {DirAsync, DirSync} from "./Directory";
import {FileAsync, FileSync} from "./File";
import {tempPath} from "./utils";

export * from "./File";
export * from "./Directory";

interface FileWriteOptions {
    name?: string;
    base?: string;
    parent?: string;
    encoding?: string;
    mode?: string | number;
    flag?: string;
}

interface DirectoryWriteOptions {
    encoding?: string;
    mode?: string | number;
    flag?: string;
}

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

/**
 * Creates a temporary directory with custom options
 * @param name Optional directory name
 * @param options Optional directory write options
 */
export async function dir(name?: string, options: DirectoryWriteOptions = {}) {
    const d = new DirAsync({
        dirpath: tempPath({ name }),
        options,
    });
    await d.init();
    return d;
}

/**
 * Creates a temporary directory with custom options in sync mode
 * @param name Optional directory name
 * @param options Optional directory write options
 */
export function dirSync(name?: string, options: DirectoryWriteOptions = {}) {
    return new DirSync({
        dirpath: tempPath({ name }),
        options,
    });
}

export default {
    dir,
    dirSync,
    file,
    fileSync,
};

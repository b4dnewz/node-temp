import {tempPath} from "../utils";
import {DirWriteOptions} from "./Base";
import {DirAsync} from "./DirAsync";
import {DirSync} from "./DirSync";

export * from "./DirSync";
export * from "./DirAsync";

/**
 * Creates a temporary directory with custom options
 * @param name Optional directory name
 * @param options Optional directory write options
 */
export async function dir(name?: string, options: DirWriteOptions = {}) {
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
export function dirSync(name?: string, options: DirWriteOptions = {}) {
    return new DirSync({
        dirpath: tempPath({ name }),
        options,
    });
}

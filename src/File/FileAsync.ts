import fs, { WriteFileOptions } from "fs-extra";
import { File, FileConstructor, ReadFileOptions } from "./Base";

/**
 * Creates a temporary file handler
 * which uses async file system functions
 */
export class FileAsync extends File {
    constructor(args: FileConstructor) {
        super(args);
    }

    public async init(content: any) {
        await fs.ensureDir(this.dirname);
        await fs.writeFile(this.path, content, this.options);
    }

    public empty() {
        return fs.truncate(this.path, 0);
    }

    public content(opts?: ReadFileOptions) {
        const { encoding, flag } = this.options;
        return fs.readFile(this.path, {
            encoding,
            flag,
            ...opts,
        });
    }

    public setContent(data: any, opts?: WriteFileOptions) {
        return fs.writeFile(this.path, data, {
            ...this.options,
            ...opts,
        });
    }

    public remove() {
        return fs.remove(this.path);
    }
}

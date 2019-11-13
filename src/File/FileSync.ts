import fs, { WriteFileOptions } from "fs-extra";
import { File, FileConstructor, ReadFileOptions } from "./Base";

export interface FileSyncContructor extends FileConstructor {
    content: any;
}

/**
 * Creates a temporary file handler
 * which uses sync file system functions
 */
export class FileSync extends File {
    constructor(args: FileSyncContructor) {
        super(args);
        const { content } = args;

        fs.ensureDirSync(this.dirname);
        fs.writeFileSync(this.path, content, this.options);
    }

    public empty() {
        fs.truncateSync(this.path, 0);
    }

    public content(opts?: ReadFileOptions) {
        return fs.readFileSync(this.path, {
            ...this.options,
            ...opts,
        });
    }

    public setContent(data: any, opts?: WriteFileOptions) {
        fs.writeFileSync(this.path, data, {
            ...this.options,
            ...opts,
        });
    }

    public remove() {
        fs.unlinkSync(this.path);
    }
}

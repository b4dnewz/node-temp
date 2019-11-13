import fs, { ReadOptions, WriteFileOptions } from "fs-extra";
import { File, FileConstructor } from "./Base";

export interface FileSyncContructor extends FileConstructor {
    content: any;
}

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

    public content(opts?: ReadOptions) {
        return fs.readFileSync(this.path, {
           ...this.options,
           ...opts,
        });
    }

    public remove() {
        fs.unlinkSync(this.path);
    }
}

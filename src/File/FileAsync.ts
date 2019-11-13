import fs, { ReadOptions } from "fs-extra";
import { File, FileConstructor } from "./Base";

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

    public content(opts?: ReadOptions) {
        return fs.readFile(this.path, {
            ...this.options,
            ...opts,
        });
    }

    public remove() {
        return fs.remove(this.path);
    }
}

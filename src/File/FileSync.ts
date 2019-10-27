import fs, {ReadOptions} from "fs-extra";
import {File} from "./Base";

export class FileSync extends File {
    constructor(args) {
        super(args);
        const {content} = args;

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

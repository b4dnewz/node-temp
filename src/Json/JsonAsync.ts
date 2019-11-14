import fs, { ReadOptions } from "fs-extra";
import { JsonFileOptions } from ".";
import { FileAsync } from "../File";

export class JsonAsync extends FileAsync {

    public readonly options: JsonFileOptions;

    constructor(args) {
        args.options = {
            ...args.options,
            encoding: "utf-8",
        };
        super(args);
    }

    public async init(content: any) {
        await fs.ensureDir(this.dirname);
        await fs.writeJSON(this.path, content, this.options);
    }

    public content(opts?: ReadOptions) {
        return fs.readJSON(this.path, {
            ...this.options,
            ...opts,
        });
    }

    public setContent(data: any, opts?: JsonFileOptions) {
        return fs.writeJSON(
            this.path,
            data,
            {
                ...this.options,
                ...opts,
            },
        );
    }

    public empty() {
        return fs.writeJSON(this.path, {}, this.options);
    }

}

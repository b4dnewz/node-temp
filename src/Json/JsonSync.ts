import fs, { ReadOptions } from "fs-extra";
import { JsonFileOptions } from ".";
import { FileSync } from "../File";

export class JsonSync extends FileSync {

    public options: JsonFileOptions;

    constructor({ content, options, filepath }) {
        const { replacer, space } = options;
        content = JSON.stringify(content, replacer, space);
        options = { ...options, encoding: "utf-8" };
        super({
            content,
            filepath,
            options,
        });
    }

    public content(opts?: ReadOptions) {
        return fs.readJSONSync(this.path, {
            ...this.options,
            ...opts,
        });
    }

    public setContent(data: any, opts?: JsonFileOptions) {
        fs.writeJSONSync(
            this.path,
            data,
            {
                ...this.options,
                ...opts,
            },
        );
    }

    public empty() {
        fs.writeJSONSync(this.path, {}, this.options);
    }

}

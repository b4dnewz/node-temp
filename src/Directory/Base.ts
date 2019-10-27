import fs from "fs";
import path from "path";
import {FileAsync, FileSync} from "../File";

export abstract class Directory {
    public readonly name: string;
    public readonly path: string;
    public readonly options: any;
    protected files: any[];

    constructor({
        dirpath,
        options,
    }) {

        this.name = path.basename(dirpath);
        this.path = dirpath;
        this.options = {
            ...options,
        };

    }

    public abstract file(content?: any, options?: any): any;

    public abstract empty(force: boolean);
    public abstract remove();

    protected getUntrackedFiles() {
        const files = fs.readdirSync(this.path);
        const trackedFiles = this.files.map((f) => f.name);
        const intersection = files.filter((f) => !trackedFiles.includes(f));
        return intersection;
    }
}

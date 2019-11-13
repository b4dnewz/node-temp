import fs from "fs-extra";
import { FileSync } from "../File";
import { tempPath } from "../utils";
import { Directory } from "./Base";

export class DirSync extends Directory {

    protected files: FileSync[] = [];

    constructor(args) {
        super(args);
        fs.ensureDirSync(this.path);
    }

    public file(content?: any, options?: any) {
        const file = new FileSync({
            content,
            filepath: tempPath({
                ...options,
                base: "",
                parent: this.path,
            }),
            options,
        });
        this.files.push(file);
        return file;
    }

    public empty(force = false) {
        const untrackedFiles = this.getUntrackedFiles();

        // Remove only tracked temp files
        if (untrackedFiles.length && !force) {
            this.files = this.files.reduce((a, f) => {
                f.remove();
                return a;
            }, []);
            return;
        }

        // Remove all files
        fs.emptyDirSync(this.path);
        this.files = [];
        return this;
    }

    public remove(force = false) {
        const untrackedFiles = this.getUntrackedFiles();
        if (force || untrackedFiles.length === 0) {
            fs.removeSync(this.path);
            return;
        }

        // tslint:disable-next-line: no-console
        console.warn("The directory is not empty and contains untracked files not generated from this module");
    }

}

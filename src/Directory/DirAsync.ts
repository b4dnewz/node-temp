import fs from "fs-extra";
import { FileAsync } from "../File";
import { tempPath } from "../utils";
import { Directory } from "./Base";

export class DirAsync extends Directory {
    protected files: FileAsync[] = [];

    constructor(args) {
        super(args);
    }

    public async init() {
        await fs.ensureDir(this.path);
    }

    public async file(content?: any, options?: any) {
        const file = new FileAsync({
            filepath: tempPath({
                ...options,
                base: "",
                parent: this.path,
            }),
            options,
        });
        await file.init(content);
        this.files.push(file);
        return file;
    }

    public async empty(force = false) {
        const untrackedFiles = this.getUntrackedFiles();
        if (untrackedFiles.length && !force) {
            const promises = this.files.map((f) => f.remove());
            await Promise.all(promises);
            this.files = [];
            return;
        }

        await fs.emptyDir(this.path);
        this.files = [];
    }

    public async remove(force = false) {
        const untrackedFiles = this.getUntrackedFiles();
        if (force || untrackedFiles.length === 0) {
            await fs.remove(this.path);
            return;
        }

        // tslint:disable-next-line: no-console
        console.warn("The directory is not empty and contains untracked files not generated from this module");
    }
}

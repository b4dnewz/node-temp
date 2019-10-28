import fs from "fs";
import path from "path";

export interface DirWriteOptions {
    mode?: string | number;
}

export interface DirectoryOptions {
    dirpath: string;
    options: DirWriteOptions;
}

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

    /**
     * Create a temporary file inside the directory
     */
    public abstract file(content?: any, options?: any): any;

    /**
     * Clear the directory content
     */
    public abstract empty(force: boolean);

    /**
     * Remove the directory and all it's content
     */
    public abstract remove();

    protected getUntrackedFiles() {
        const files = fs.readdirSync(this.path);
        const trackedFiles = this.files.map((f) => f.name);
        const intersection = files.filter((f) => !trackedFiles.includes(f));
        return intersection;
    }
}

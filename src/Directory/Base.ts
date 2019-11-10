import fs from "fs";
import path from "path";
import { tracker } from "../tracking";

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

    /**
     * Add the directory to the tracked directories that are
     * automatically removed when process exit or fail
     */
    public track() {
        tracker.track(this.path, true);
        return this;
    }

    /**
     * Remove the directory from the tracked directories that are
     * automatically removed when process exit or fail
     * this is useful when want the directory to be kept
     */
    public untrack() {
        tracker.untrack(this.path);
        return this;
    }

    /**
     * Get the directory files that hasn't been created
     * from the module and are potentially dangerous to remove
     */
    protected getUntrackedFiles() {
        const files = fs.readdirSync(this.path);
        const trackedFiles = this.files.map((f) => f.name);
        const intersection = files.filter((f) => !trackedFiles.includes(f));
        return intersection;
    }
}

import { WriteFileOptions } from "fs-extra";
import path from "path";
import { tracker } from "../tracking";

export type ReadFileOptions = {
    flag?: string,
} | {
    encoding: string;
    flag?: string;
};

export interface FileWriteOptions extends WriteFileOptions {
    name?: string;
    base?: string;
    parent?: string;
}

export interface FileConstructor {
    filepath: string;
    options?: FileWriteOptions;
}

export abstract class File {

    public readonly name: string;

    public readonly path: string;

    public readonly dirname: string;

    public readonly options: FileWriteOptions;

    constructor({
        filepath,
        options,
    }: FileConstructor) {

        this.name = path.basename(filepath);
        this.path = filepath;
        this.dirname = path.dirname(filepath);
        this.options = {
            encoding: "utf-8",
            ...options,
        };

        // Automatically track and remove
        tracker.track(this.path);

    }

    /**
     * Clear the file content and it's size
     */
    public abstract empty();

    /**
     * Return the file content with desired read options
     */
    public abstract content(opts?: ReadFileOptions);

    /**
     * Updates the file content
     */
    public abstract setContent(data: any, opts?: WriteFileOptions);

    /**
     * Remove the file from the system
     */
    public abstract remove();

    /**
     * Add the file to the tracked files that are
     * automatically removed when process exit or fail
     */
    public track() {
        tracker.track(this.path, true);
        return this;
    }

    /**
     * Remove the file from the tracked files that are
     * automatically removed when process exit or fail
     * this is useful when want the file to be kept
     */
    public untrack() {
        tracker.untrack(this.path);
        return this;
    }

}

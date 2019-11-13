import { WriteFileOptions } from "fs-extra";
import path from "path";

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

}

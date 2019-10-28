import {ReadOptions} from "fs-extra";
import path from "path";

export abstract class File {

    public readonly name: string;

    public readonly path: string;

    public readonly dirname: string;

    public readonly options: any;

    constructor({
        filepath,
        options,
    }) {

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
     * Return the file content with
     * desired read options
     */
    public abstract content(opts?: ReadOptions);

    /**
     * Remove the file from the system
     */
    public abstract remove();

}

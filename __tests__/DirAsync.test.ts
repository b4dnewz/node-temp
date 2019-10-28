import fs from "fs-extra";
import path from "path";
import {promisify} from "util";
import * as temp from "../src";

describe("DirAsync", () => {

    let dir: temp.DirAsync;

    const dirOptions = {
        mode: "0755",
    };

    beforeAll(async () => {
        dir = await temp.dir("test", dirOptions);
    });

    beforeEach(async () => {
        await dir.empty();
    });

    it("should set properties", () => {
        expect(dir).toMatchObject({
            name: "test",
            path: expect.any(String),
            options: dirOptions,
        });
    });

    it("should create temp file inside directory", async () => {
        const fileInDir = await dir.file();
        expect(fs.existsSync(fileInDir.path)).toBeTruthy();
        expect(fs.readdirSync(dir.path)).toEqual([
            fileInDir.name,
        ]);
    });

    it("should clear directory content", async () => {
        await dir.file();
        await dir.empty();
        await expect(fs.readdir(dir.path)).resolves.toEqual([]);
    });

    it("should warn when contains untracked files", async () => {
        const spy = jest.spyOn(console, "warn");
        const filepath = path.resolve(dir.path, "some-file");
        fs.writeFileSync(filepath, "");
        await dir.remove();
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("untracked files"));
        expect(fs.existsSync(dir.path)).not.toBeFalsy();
    });

    it("should clear only tracked files", async () => {
        const filepath = path.resolve(dir.path, "some-file");
        const filename = path.basename(filepath);
        await dir.empty();
        fs.writeFileSync(filepath, "");
        await dir.file();
        await dir.empty();
        expect(fs.readdirSync(dir.path)).toEqual([filename]);
    });

    it("should ignore untracked files when using force option", async () => {
        const filepath = path.resolve(dir.path, "some-file");
        await fs.writeFile(filepath, "");
        await dir.empty(true);
        await expect(fs.readdir(dir.path)).resolves.toEqual([]);
    });

    it("should remove itself", async () => {
        await dir.remove();
        await expect(promisify(fs.access)(dir.path)).rejects.toMatchObject({
            code: "ENOENT",
        });
    });

});

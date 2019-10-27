import fs from "fs-extra";
import path from "path";
import temp, {DirSync} from "../src";

describe("DirSync", () => {

    let dir: DirSync;

    const dirOptions = {
        mode: "0755",
    };

    beforeAll(() => {
        dir = temp.dirSync("test", dirOptions);
    });

    it("should set properties", () => {
        expect(dir).toMatchObject({
            name: "test",
            path: expect.any(String),
            options: dirOptions,
        });
    });

    it("should create temp file inside directory", () => {
        const fileInDir = dir.empty().file();
        expect(fs.existsSync(fileInDir.path)).toBeTruthy();
        expect(fs.readdirSync(dir.path)).toEqual([
            fileInDir.name,
        ]);
    });

    it("should clear directory content", () => {
        dir.file();
        dir.empty();
        expect(fs.readdirSync(dir.path)).toEqual([]);
    });

    it("should warn when contains untracked files", () => {
        const spy = jest.spyOn(console, "warn");
        const filepath = path.resolve(dir.path, "some-file");
        fs.writeFileSync(filepath, "");
        dir.remove();
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("untracked files"));
        expect(fs.existsSync(dir.path)).not.toBeFalsy();
    });

    it("should clear only tracked files", () => {
        const filepath = path.resolve(dir.path, "some-file");
        const filename = path.basename(filepath);
        dir.empty(true);
        fs.writeFileSync(filepath, "");
        dir.file();
        dir.empty();
        expect(fs.readdirSync(dir.path)).toEqual([filename]);
    });

    it("should ignore untracked files when using force option", () => {
        const filepath = path.resolve(dir.path, "some-file");
        fs.writeFileSync(filepath, "");
        dir.empty(true);
        expect(fs.readdirSync(dir.path)).toEqual([]);
    });

    it("should remove itself", () => {
        dir.remove();
        expect(fs.existsSync(dir.path)).toBeFalsy();
    });

});

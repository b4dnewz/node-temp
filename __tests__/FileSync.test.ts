import fs from "fs-extra";
import * as temp from "../src";

describe("FileSync", () => {

    let file: temp.FileSync;

    const fileContent = "test";
    const fileOptions = {
        encoding: "utf-8",
        mode: 0o666,
    };

    beforeAll(() => {
        file = temp.fileSync(fileContent, {
            encoding: "utf-8",
            mode: 0o666,
        });
    });

    it("should set properties", () => {
        expect(file).toMatchObject({
            name: expect.any(String),
            options: fileOptions,
            path: expect.any(String),
        });
    });

    it("should return the file content", () => {
        expect(file.content()).toEqual(fileContent);
    });

    it("should support read options", () => {
        const result = new Buffer(fileContent).toString("base64");
        expect(file.content({
            encoding: "base64",
        })).toEqual(result);
    });

    it("should clear the file content", () => {
        file.empty();
        expect(file.content()).toEqual("");
    });

    it("should update the file content", () => {
        const newContent = "some-content";
        file.setContent(newContent);
        expect(file.content()).toEqual(newContent);
    });

    it("should remove itself", () => {
        file.remove();
        expect(fs.existsSync(file.path)).toBeFalsy();
    });

    it("should allow custom file name", () => {
        const filename = "avatar.png";
        file = temp.fileSync(fileContent, {
            name: filename,
        });
        expect(file.name).toEqual(filename);
        expect(file.path).toMatch(new RegExp(`\\b${filename}$`));
        file.remove();
    });

});

import fs from "fs-extra";
import * as temp from "../src";

describe("FileAsync", () => {

    let file: temp.FileAsync;

    const fileContent = "test";
    const fileOptions = {
        encoding: "utf-8",
        mode: 0o666,
    };

    beforeAll(async () => {
        file = await temp.file(fileContent, {
            encoding: "utf-8",
            mode: 0o666,
        });
    });

    it("should set properties", () => {
        expect(file).toMatchObject({
            name: expect.any(String),
            path: expect.any(String),
            options: fileOptions,
        });
    });

    it("should return the file content", async () => {
        await expect(file.content()).resolves.toEqual(fileContent);
    });

    it("should support read options", async () => {
        const result = new Buffer(fileContent).toString("base64");
        await expect(file.content({
            encoding: "base64",
        })).resolves.toEqual(result);
    });

    it("should clear the file content", async () => {
        await file.empty();
        await expect(file.content()).resolves.toEqual("");
    });

    it("should update the file content", async () => {
        const newContent = "some-content";
        await file.setContent(newContent);
        await expect(file.content()).resolves.toEqual(newContent);
    });

    it("should remove itself", async () => {
        await file.remove();
        expect(fs.existsSync(file.path)).toBeFalsy();
    });

});

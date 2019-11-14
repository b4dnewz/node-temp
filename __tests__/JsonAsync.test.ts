import fs from "fs-extra";
import * as temp from "../src";

describe("JsonAsync", () => {

    let file: temp.JsonAsync;

    const fileContent = {
        foo: "bar",
    };
    const fileOptions = {
        replacer: null,
        spaces: 4,
    };

    beforeAll(async () => {
        file = await temp.jsonAsync(fileContent, fileOptions);
    });

    it("should set properties", () => {
        expect(file).toMatchObject({
            name: expect.any(String),
            options: fileOptions,
            path: expect.any(String),
        });
    });

    it("should set file content as json string", async () => {
        const val = await fs.readFile(file.path, "utf-8");
        const strVal = JSON.stringify(
            fileContent,
            fileOptions.replacer,
            fileOptions.spaces,
        );
        expect(val).toMatch(strVal);
    });

    it("should return the file content", async () => {
        await expect(file.content()).resolves.toEqual(fileContent);
    });

    it("should update the file content", async () => {
        const newContent = {
            fee: "bat",
            foo: "bar",
        };
        await file.setContent(newContent);
        await expect(file.content()).resolves.toEqual(newContent);
    });

    it("should clear the file content", async () => {
        await file.empty();
        await expect(file.content()).resolves.toEqual({});
    });

});

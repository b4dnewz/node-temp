import fs from "fs-extra";
import * as temp from "../src";

describe("JsonSync", () => {

    let file: temp.JsonSync;

    const fileContent = {
        foo: "bar",
    };
    const fileOptions = {
        replacer: null,
        space: 4,
    };

    beforeAll(() => {
        file = temp.jsonSync(fileContent, fileOptions);
    });

    it("should set properties", () => {
        expect(file).toMatchObject({
            name: expect.any(String),
            options: fileOptions,
            path: expect.any(String),
        });
    });

    it("should set file content as json string", () => {
        const val = fs.readFileSync(file.path, "utf-8");
        expect(val).toEqual(
            JSON.stringify(fileContent, fileOptions.replacer, fileOptions.space),
        );
    });

    it("should return the file content", () => {
        expect(file.content()).toEqual(fileContent);
    });

    it("should update the file content", () => {
        const newContent = {
            fee: "bat",
            foo: "bar",
        };
        file.setContent(newContent);
        expect(file.content()).toEqual(newContent);
    });

    it("should clear the file content", () => {
        file.empty();
        expect(file.content()).toEqual({});
    });

});

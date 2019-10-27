import fs from "fs-extra";
import temp, {FileSync} from "../src";

describe("FileSync", () => {

    let file: FileSync;

    const fileContent = "test";
    const fileOptions = {
        encoding: "utf-8",
        mode: "0666",
    };

    beforeAll(() => {
        file = temp.fileSync(fileContent, {
            encoding: "utf-8",
            mode: "0666",
        });
    });

    it("should set properties", () => {
        expect(file).toMatchObject({
            name: expect.any(String),
            path: expect.any(String),
            options: fileOptions,
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

    it("should remove itself", () => {
        file.remove();
        expect(fs.existsSync(file.path)).toBeFalsy();
    });

});

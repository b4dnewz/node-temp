import {tempDir, tempPath} from "../src/utils";

describe("utils", () => {

    describe("tempPath", () => {

        it("should return a string", () => {
            expect(typeof tempPath()).toEqual("string");
        });

        it("should include tempDir", () => {
            expect(tempPath()).toContain(tempDir);
        });

        it("should use custom name", () => {
            const name = "test-name";
            expect(tempPath({
                name,
            })).toContain(name);
        });

        it("should use custom base", () => {
            const base = "test-base";
            expect(tempPath({
                base,
            })).toContain(base);
        });

    });

});

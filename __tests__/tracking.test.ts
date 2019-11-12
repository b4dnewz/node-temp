import { fork } from "@b4dnewz/process-test";
import fs from "fs-extra";
import path from "path";
import { tracker } from "../src/tracking";

const rndStr = () => Math.random().toString(36).substr(2);

const events: any = [
    "exit",
    "SIGINT",
];

const run = (name: string) => fork(
    `__fixtures__/${name}.ts`,
    [],
    {
        cwd: path.resolve(__dirname, ".."),
        execArgv: ["-r", "ts-node/register"]
    }
);

describe("tracking", () => {

    describe("unit", () => {
        it("should add values to tracker set", () => {
            const len = 4
            for (let i = 0; i < len; i++) {
                tracker.track(rndStr());
            }
            expect(tracker.content().length).toBe(len);
        });

        it("should prevent adding values when stopped", () => {
            const value = rndStr();
            tracker.trackAll(false);
            tracker.track(value);
            tracker.trackAll(true);
            expect(tracker.content()).not.toContain(value);
        });

        it("should remove values to tracker set", () => {
            const val = rndStr();
            tracker.track(val);
            expect(tracker.content()).toContain(val);
            tracker.untrack(val);
            expect(tracker.content()).not.toContain(val);
        });

        it("should ignore values already in set", () => {
            expect(() => {
                tracker.track("./some-file");
                tracker.track("./some-file");
            }).not.toThrow();
        });

        it("should ignore non existing value on remove", () => {
            expect(() => {
                tracker.untrack("./non-existing-file");
            }).not.toThrow();
        });

        it("should remove exit listener", () => {
            tracker.trackAll();
            expect(process.listeners("exit").length).not.toBe(0);
            tracker.trackAll(false);
            expect(process.listeners("exit").length).toBe(0);
        });

        it("should remove all listeners", () => {
            tracker.trackAll();
            tracker.removeListeners();

            events.forEach((event) => {
                expect(process.listeners(event).length).toBe(0);
            });
        });

        it("should clear tracker set", () => {
            tracker.track(rndStr());
            expect(tracker.content().length).not.toBe(0);

            tracker.clear();
            expect(tracker.content().length).toBe(0);
        });

        it("should clear listeners and tracker set", () => {
            tracker.track(rndStr());
            expect(tracker.content().length).not.toBe(0);

            tracker.reset();
            expect(tracker.content().length).toBe(0);
            events.forEach((event) => {
                expect(process.listeners(event).length).toBe(0);
            });
        });
    });

    describe("integration", () => {

        // increase timeout since ts-node may take some time
        jest.setTimeout(10000);

        it("should remove file on process exit", (done) => {
            run("remove-file")
                .expect("code", 0)
                .end((err, res) => {
                    expect(err).toBeUndefined();

                    const filePath = res.stdout;
                    expect(filePath).toBeDefined();
                    expect(filePath).not.toHaveLength(0);
                    expect(fs.existsSync(filePath)).toBeFalsy();
                    done(err);
                });
        })

        it("should manually track file and remove on process exit", (done) => {
            run("remove-file-2")
                .expect("code", 0)
                .end((err, res) => {
                    expect(err).toBeUndefined();

                    const filePath = res.stdout;
                    expect(filePath).toBeDefined();
                    expect(filePath).not.toHaveLength(0);
                    expect(fs.existsSync(filePath)).toBeFalsy();
                    done(err);
                });
        })

        it("should keep file on process exit", (done) => {
            run("keep-file")
                .expect("code", 0)
                .end((err, res) => {
                    expect(err).toBeUndefined();

                    const filePath = res.stdout.replace("\n", "");
                    expect(filePath).toBeDefined();
                    expect(filePath).not.toHaveLength(0);
                    expect(fs.existsSync(filePath)).toBeTruthy();

                    fs.removeSync(filePath);
                    done(err);
                });
        })

        it("should manually untrack file and keep on exit", (done) => {
            run("keep-file-2")
                .expect("code", 0)
                .end((err, res) => {
                    expect(err).toBeUndefined();

                    const filePath = res.stdout.replace("\n", "");
                    expect(filePath).toBeDefined();
                    expect(filePath).not.toHaveLength(0);
                    expect(fs.existsSync(filePath)).toBeTruthy();

                    fs.removeSync(filePath);
                    done(err);
                });
        })

    })

});
